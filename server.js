const express = require("express");

const server = express();

server.get("/", async (req, res) => {
  res.send("welcome to auth API");
});

module.exports = server;
