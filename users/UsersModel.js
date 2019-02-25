const db = require("../data/knexConfig");

module.exports = {
  find: function() {
    return db("users");
  },
  add: function(credentials) {
    return db("users").insert(credentials);
  },
  findBy: function(filter) {
    return db("users")
      .where(filter)
      .first();
  }
};
