exports.up = async function (knex) {
	await knex.schema.createTable("health_data", (tbl) => {
		tbl.uuid("id").primary();
		tbl.string("coach_id").notNull();
		tbl.foreign("coach_id").references("coach.id");
		tbl.string("client_id").notNull();
		tbl.foreign("client_id").references("client.id");
		tbl.timestamp("submitted_at").defaultTo(knex.fn.now());
		tbl.integer("systolic_bp");
		tbl.integer("diastolic_bp");
		tbl.integer("weight");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("health_data");
};
