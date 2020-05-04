
exports.up = async function(knex) {
  await knex.schema.createTable('auth_sessions', table =>{
      table.string('sid').notNull();
      table.json('sess').notNull();
      table.timestamp('expired', {useTz: true}).notNull();
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("auth_sessions");
};