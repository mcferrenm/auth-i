const express = require("express");

const configureMiddleware = require("./middleware");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const { restricted, checkRoles } = require("../auth/auth-middleware");

const server = express();

// Global Middleware
configureMiddleware(server);

// Routes
server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);

module.exports = server;
