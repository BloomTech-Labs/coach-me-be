exports.seed = async function (knex) {
	await knex("conditions").insert([
		{
			id: "12b228ba-9abd-490f-b555-79eb872dd024",
			condition: "Diabetes",
		},
		{
			id: "3acecb61-11d3-4df4-a0e9-9c3ea1b03dd3",
			condition: "HBP",
		},
		{
			id: "10544fb3-dc97-429f-9899-4c6d2c80c604",
			condition: "Anxiety",
		},
		{
			id: "5b929b97-50d9-44bf-a83c-dc3ec348a96d",
			condition: "High Cholesterol",
		},
		{
			id: "3e49bc28-84da-43d2-9ab9-90b3db675ebc",
			condition: "Depression",
		},
	]);
};
