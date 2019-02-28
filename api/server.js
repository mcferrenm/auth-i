const express = require("express");
const path = require("path");

const configureMiddleware = require("./middleware");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const { restricted, checkRoles } = require("../auth/auth-middleware");

const server = express();

// Global Middleware
configureMiddleware(server);

// Routes
server.use("/api/auth", authRouter);
server.use("/api/users", restricted, checkRoles("student"), usersRouter);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = server;
