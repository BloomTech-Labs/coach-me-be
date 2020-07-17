exports.up = async function (knex) {
	await knex.schema.createTable("sessions", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.timestamp("submitted_at").defaultTo(knex.fn.now());
		tbl.timestamp("session_date").notNull();
		tbl.text("notes").notNull();
		tbl.uuid("coach_id").notNull();
		tbl.foreign("coach_id").references("coach.id").onDelete("CASCADE");
		tbl.uuid("client_id").notNull();
		tbl.foreign("client_id").references("client.id").onDelete("CASCADE");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("sessions");
};
