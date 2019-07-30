const db = require("../data/knexConfig");

module.exports = {
  get: function(id) {
    let query = db("users");
    if (id) {
      query.where({ id }).first();
      const promises = [query, this.findRolesByUserId(id)];

      return Promise.all(promises).then(function(results) {
        let [user, roles] = results;

        user.roles = roles;

        return user;
      });
    }

    return query;
  },
  add: function(credentials) {
    return db("users").insert(credentials);
  },
  // Combine with get
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
