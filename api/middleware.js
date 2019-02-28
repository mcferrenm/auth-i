const helmet = require("helmet");
const express = require("express");
const path = require("path");

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  // server.use(express.static(path.join(__dirname, "../client/build")));
};
