exports.up = async function (knex) {
	await knex.schema.createTable("conditions", (tbl) => {
		tbl.uuid("id").primary();
		tbl.text("condition").notNull();
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("conditions");
};
