exports.seed = async function (knex) {
	await knex("conditions").insert([
		{
			id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
			condition: "Diabetes",
		},
		{
			id: "7a27dd43-b1d1-47aa-8d62-b6f63a5a2e29",
			condition: "HBP",
		},
		{
			id: "99293a83-cb81-4be9-bacc-1f17c1191d5e",
			condition: "Anxiety",
		},
		{
			id: "b48e1d3e-f976-44bf-8d16-c164d81adb89",
			condition: "High Cholesterol",
		},
		{
			id: "2c51112d-6ac5-448d-afef-69700af28d97",
			condition: "Depression",
		},
	]);
};
