exports.seed = function(knex, Promise) {
  return knex("users-roles").then(function() {
    // Inserts seed entries
    return knex("users-roles").insert([{ user_id: 1, role_id: 2 }]);
  });
};
