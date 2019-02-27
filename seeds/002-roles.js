exports.seed = function(knex, Promise) {
  return knex("roles")
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        { name: "instructor" },
        { name: "student" },
        { name: "t/a" },
        { name: "admin" },
        { name: "project manager" },
      ]);
    });
};
