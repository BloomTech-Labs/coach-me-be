exports.seed = async function (knex) {
	await knex("coach").insert([
		{
			id: "11e30af8-b531-49b2-9387-2647dc76444a",
			first_name: "Derek",
			last_name: "Peters",
			email: "derekpeters@gmail.com",
			phone: 5029876732,
			password: "password123",
			profile_pic_id: 1093,
			creds_id: "123405",
		},
		{
			id: "659918be-887a-4ce7-a5c7-29434aeb1cb7",
			first_name: "Thomas",
			last_name: "Barrett",
			email: "thomasbarrett@gmail.com",
			phone: 5067934783,
			password: "password123",
			profile_pic_id: 29384,
			creds_id: 304958,
		},
	]);
};
