exports.up = async function (knex) {
	await knex.schema.createTable("health_data", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.uuid("coach_id").notNull();
		tbl.foreign("coach_id").references("coach.id").onDelete("CASCADE");
		tbl.uuid("client_id").notNull();
		tbl.foreign("client_id").references("client.id").onDelete("CASCADE");
		tbl.timestamp("submitted_at").defaultTo(knex.fn.now());
		tbl.integer("systolic_bp");
		tbl.integer("diastolic_bp");
		tbl.integer("weight");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("health_data");
};
