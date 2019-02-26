const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");

const Users = require("./users/UsersModel");

const server = express();

const sessionConfig = {
  name: "monkey",
  secret: "my secret monkey secret",
  cookie: {
    maxAge: 1000 * 60 * 15, // 15 min
    secure: false // https only!
  },
  httpOnly: true, // no js access through document.cookie
  resave: false, // don't resave unmodified
  saveUninitialized: false // GDPR laws against setting cookies automatically w/o consent
};

// Global Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

// Local Middleware

async function restricted(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
}

server.use("/api/restricted", restricted);

// Routes
server.get("/api/restricted/users", restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

// server.get("/api/users", async (req, res) => {
//   try {
//     const users = await Users.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Error retrieving users" });
//   }
// });

server.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "Must provide username and password" });
    } else {
      const hash = bcrypt.hashSync(password, 12);
      req.body.password = hash;

      const [id] = await Users.add(req.body);
      res.status(201).json({ id });
    }
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

server.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "Must provide username and password" });
    } else {
      const user = await Users.findBy({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.status(200).json({
          message: `Welcome ${user.username}`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
});

server.get("/", async (req, res) => {
  res.send("welcome to auth API");
});

module.exports = server;
