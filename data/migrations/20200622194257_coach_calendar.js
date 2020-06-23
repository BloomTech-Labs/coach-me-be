
exports.up = async function(knex) {
  await knex.schema.createTable('coach_calendar', table =>{
    table.uuid('coach_id').references('id').inTable('coach')
    table.string("calendly_link").notNull();
  });
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('coach_calendar');
};
