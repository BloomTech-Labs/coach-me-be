exports.up = async function (knex) {
	await knex.schema.createTable("coach_client", (tbl) => {
		tbl.uuid("coach_id").notNull();
		tbl.foreign("coach_id").references("coach.id").onDelete("CASCADE");
		tbl.uuid("client_id").notNull();
		tbl.foreign("client_id").references("client.id").onDelete("CASCADE");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("coach_client");
};
