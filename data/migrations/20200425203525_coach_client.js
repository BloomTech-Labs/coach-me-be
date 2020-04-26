exports.up = async function (knex) {
	await knex.schema.createTable("coach_client", (tbl) => {
		tbl.string("coach_id").notNull();
		tbl.foreign("coach_id").references("coach.id");
		tbl.string("client_id").notNull();
		tbl.foreign("client_id").references("client.id");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("coach_client");
};
