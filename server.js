const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const db = require("./data/knexConfig");
const Users = require("./users/UsersModel");

const server = express();

const secret = process.env.JWT_SECRET || "IamNotMyThoughts";

// Global Middleware
server.use(express.json());
server.use(helmet());

// Serve static files from the React app
server.use(express.static(path.join(__dirname, "client/build")));

// Local Middleware

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // log error to db
        res.status(401).json({ error: "cant touch this" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
}

function checkRoles(role) {
  return function (req, res, next) {
    if (req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden!"})
    }
  }
}

server.use("/api/restricted", restricted, checkRoles('student'));

// Routes
server.get("/api/restricted/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

server.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "Must provide username and password" });
    } else {
      const hash = bcrypt.hashSync(password, 12);
      req.body.password = hash;

      const [id] = await Users.add(req.body);

      const user = await Users.findBy({ id });

      if (user) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}, here is your token.`,
          token
        });
      } else {
        res.status(401).json({ error: "Error registering user" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['student']
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

server.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "Must provide username and password" });
    } else {
      const user = await Users.findBy({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}, here is your token.`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
});

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = server;
