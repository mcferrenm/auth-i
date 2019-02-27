
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('roles', tbl => {
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique()

      tbl.timestamps(true, true)
    })
    .createTable('users-roles', tbl => {
      tbl.increments();
  
      tbl
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("roles")
        .onDelete("restrict")
        .onUpdate("cascade");

      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("users")
        .onDelete("restrict")
        .onUpdate("cascade");
  
      tbl.timestamps(true, true)
    })

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("roles")
    .dropTableIfExists("users-roles")
};
