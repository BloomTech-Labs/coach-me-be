exports.seed = async function (knex) {
	await knex("client_condition").insert([
		{
			client_id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
			condition_id: "12b228ba-9abd-490f-b555-79eb872dd024",
		},
		{
			client_id: "82ad6337-b099-4bd7-b0f7-6c0c316fe250",
			condition_id: "3acecb61-11d3-4df4-a0e9-9c3ea1b03dd3",
		},
		{
			client_id: "404e1e3c-2275-4a31-b073-123098307277",
			condition_id: "5b929b97-50d9-44bf-a83c-dc3ec348a96d",
		},
		{
			client_id: "404e1e3c-2275-4a31-b073-123098307277",
			condition_id: "10544fb3-dc97-429f-9899-4c6d2c80c604",
		},
	]);
};
