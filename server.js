const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");

const Users = require("./users/UsersModel");

const server = express();

// Global Middleware
server.use(express.json());
server.use(helmet());

// Routes
server.get("/api/users", async (req, res) => {
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
      res.status(201).json({ id });
    }
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

server.get("/", async (req, res) => {
  res.send("welcome to auth API");
});

module.exports = server;
