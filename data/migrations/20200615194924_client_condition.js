exports.up = async function (knex) {
	await knex.schema.createTable("client_condition", (tbl) => {
		tbl.uuid("client_id").notNull();
		tbl.foreign("client_id").references("client.id").onDelete("CASCADE");
		tbl.uuid("condition_id").notNull();
		tbl.foreign("condition_id").references("conditions.id").onDelete("CASCADE");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("client_condition");
};
