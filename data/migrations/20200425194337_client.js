exports.up = async function (knex) {
	await knex.schema.createTable("client", (tbl) => {
		tbl.uuid("id").primary();
		tbl.string("first_name", 20).notNull();
		tbl.string("last_name", 20).notNull();
		tbl.string("email").notNull();
		tbl.integer("phone", 10).notNull();
		tbl.date("dob").notNull();
		tbl.string("password").notNull();
		tbl.string("profile_pic_id");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("last_logged_in");
		tbl.integer('height').notNull();
		tbl.string('sex').notNull();
		tbl.string('gender');
		tbl.text('med_list');
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("client");
};
