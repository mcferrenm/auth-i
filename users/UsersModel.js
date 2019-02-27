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
  },
  findRolesByUserId: function(id) {
    return (
      db("roles")
        // .where({ id });
        .join("users-roles", "users.id", "=", "users-roles.user_id")
        .join("users", "roles.id", "=", "users-roles.role_id")
        .select("roles.name", { role_id: "roles.id" })
        .where({ "users.id": id })
    );
  }
};
