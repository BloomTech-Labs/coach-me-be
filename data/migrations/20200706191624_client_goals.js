exports.up = async function (knex) {
	await knex.schema.createTable("client_goals", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.uuid("coach_id").notNull();
		tbl.foreign("coach_id").references("coach.id").onDelete("CASCADE");
		tbl.uuid("client_id").notNull();
        tbl.foreign("client_id").references("client.id").onDelete("CASCADE");
        tbl.string("title").notNull();
        tbl.string("description").notNull();
        tbl.date("start_date").notNull();
        tbl.boolean("completed").notNull();
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("client_goals");
};
