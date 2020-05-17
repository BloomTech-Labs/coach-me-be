exports.up = async function (knex) {
	await knex.schema.createTable("coach", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.string("first_name", 20).notNull();
		tbl.string("last_name", 20).notNull();
		tbl.string("email").notNull().unique()
		tbl.bigInteger("phone", 10).notNull().unique()
		tbl.string("password").notNull();
		tbl.string("profile_pic_id");
		tbl.string("creds_id");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("last_logged_in");
		tbl.string("user_type").notNull().defaultTo("coach");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("coach");
};
