exports.seed = async function (knex) {
	await knex("client_goals").insert([
		{
			coach_id: "a20e141b-0929-45dc-b296-e22b6907ca96",
			client_id: "46b97b6f-f3bf-494a-a840-44d3393d376f",
			title: "Have Goal",
			description: "to have a goal to test",
			start_date: "April 17, 2020",
			completed: false,
		},
		{
			coach_id: "a20e141b-0929-45dc-b296-e22b6907ca96",
			client_id: "46b97b6f-f3bf-494a-a840-44d3393d376f",
			title: "Test Goal #2",
			description: "This is the description of the goal",
			start_date: "November 7, 2019",
			completed: false,
		},
		{
			coach_id: "a20e141b-0929-45dc-b296-e22b6907ca96",
			client_id: "46b97b6f-f3bf-494a-a840-44d3393d376f",
			title: "Lose 5 pounds in 2 weeks",
			description: "This is gonna be a hard goal!",
			start_date: "February 5, 2020",
			completed: false,
		},
		{
			coach_id: "a20e141b-0929-45dc-b296-e22b6907ca96",
			client_id: "82ad6337-b099-4bd7-b0f7-6c0c316fe250",
			title: "Test Goal for Jesse",
			description: "Description for test goal",
			start_date: "July 1, 2020",
			completed: true,
		},
	]);
};
