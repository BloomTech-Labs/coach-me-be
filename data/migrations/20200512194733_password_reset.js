
exports.up = async function(knex) {
  await knex.schema.createTable('password_reset', table=>{
      table.uuid('client_id').references('client.id').onDelete('cascade');
      table.uuid('coach_id').references('coach.id').onDelete('cascade');
      table.string('token').notNull();
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("password_reset");
};
