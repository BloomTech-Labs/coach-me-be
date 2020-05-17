exports.up = async function (knex) {
	return knex.schema.createTable("client", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.bigInteger('google_id');
		tbl.bigInteger('facebook_id');
		tbl.string("first_name", 20).notNull();
		tbl.string("last_name", 20).notNull();
		tbl.string("email").unique();
		tbl.bigInteger("phone", 10).unique();
		tbl.date("dob");
		tbl.string("password");
		tbl.string("profile_pic_id");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("last_logged_in");
		tbl.integer("height");
		tbl.string("sex");
		tbl.string("gender");
		tbl.text("med_list");
		tbl.boolean("registration_complete").notNull().defaultTo(true);
		tbl.string("user_type").notNull().defaultTo("client");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("client");
};
