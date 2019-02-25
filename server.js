const express = require("express");
const helmet = require("helmet");

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

server.get("/", async (req, res) => {
  res.send("welcome to auth API");
});

module.exports = server;
