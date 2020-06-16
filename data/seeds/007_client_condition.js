exports.seed = async function (knex) {
	await knex("client_condition").insert([
		{
			client_id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
			condition_id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
		},
		{
			client_id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
			condition_id: "7a27dd43-b1d1-47aa-8d62-b6f63a5a2e29",
		},
		{
			client_id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
			condition_id: "b48e1d3e-f976-44bf-8d16-c164d81adb89",
		},
		{
			client_id: "82ad6337-b099-4bd7-b0f7-6c0c316fe250",
			condition_id: "7a27dd43-b1d1-47aa-8d62-b6f63a5a2e29",
		},
		{
			client_id: "404e1e3c-2275-4a31-b073-123098307277",
			condition_id: "b48e1d3e-f976-44bf-8d16-c164d81adb89",
		},
		{
			client_id: "b1b76dd7-3e32-4fcd-8947-da9de089de35",
			condition_id: "7a27dd43-b1d1-47aa-8d62-b6f63a5a2e29",
		},
		{
			client_id: "0d560384-5bce-46c9-94fb-5c5e8209f6dd",
			condition_id: "99293a83-cb81-4be9-bacc-1f17c1191d5e",
		},
		{
			client_id: "0d560384-5bce-46c9-94fb-5c5e8209f6dd",
			condition_id: "b48e1d3e-f976-44bf-8d16-c164d81adb89",
		},
		{
			client_id: "46b97b6f-f3bf-494a-a840-44d3393d376f",
			condition_id: "99293a83-cb81-4be9-bacc-1f17c1191d5e",
		},
		{
			client_id: "46b97b6f-f3bf-494a-a840-44d3393d376f",
			condition_id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
		},
	]);
};
