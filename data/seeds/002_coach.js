exports.seed = async function (knex) {
	await knex("coach").insert([
		{
			id: "11e30af8-b531-49b2-9387-2647dc76444a",
			first_name: "Derek",
			last_name: "Peters",
			email: "derekpeters@gmail.com",
			phone: 5029876732,
			password: "$2b$10$urcNsdH4HoXyifF9OSmgmeqca5WBtM4MAWLpi1PEwbf7TxIjUVgOW",
			profile_pic_id: "1093",
			creds_id: "123405",
		},
		{
			id: "659918be-887a-4ce7-a5c7-29434aeb1cb7",
			first_name: "Thomas",
			last_name: "Barrett",
			email: "thomasbarrett@gmail.com",
			phone: 5067934783,
			password: "$2b$10$urcNsdH4HoXyifF9OSmgmeqca5WBtM4MAWLpi1PEwbf7TxIjUVgOW",
			profile_pic_id: "29384",
			creds_id: "304958",
		},
		{
			id: "a20e141b-0929-45dc-b296-e22b6907ca96",
			first_name: "Jesse",
			last_name: "Tingle",
			email: "jtingle0@gmail.com",
			phone: "5022292383",
			password: "$2b$10$urcNsdH4HoXyifF9OSmgmeqca5WBtM4MAWLpi1PEwbf7TxIjUVgOW",
			profile_pic_id: "23456",
			creds_id: "45678",
		},
	]);
};
