exports.seed = async function (knex) {
	await knex("client").insert([
		{
			id: "d322ddbd-026d-4c29-8aea-fd7ae18ef572",
			first_name: "George",
			last_name: "Thomas",
			email: "gthomas@gmail.com",
			phone: 5023324040,
			dob: Date.now(),
			password: "password123",
			height: "5'10",
			sex: "male",
			gender: "male"
		},
		{
			id: "82ad6337-b099-4bd7-b0f7-6c0c316fe250",
			first_name: "Jesse",
			last_name: "Tingle",
			email: "tingle@gmail.com",
			phone: 5024566832,
			dob: Date.now(),
			password: "password123",
			height: "5'10",
			sex: "female",
			gender: ""
		},
		{
			id: "404e1e3c-2275-4a31-b073-123098307277",
			first_name: "Brian",
			last_name: "Taveras",
			email: "btaveras@gmail.com",
			phone: 4066589807,
			dob: Date.now(),
			password: 'password123',
			height: "5'10",
			sex: "male",
			gender: ""
		},
		{
			id: "b1b76dd7-3e32-4fcd-8947-da9de089de35",
			first_name: "Joshua",
			last_name: "Burleson",
			email: "burleson@gmail.com",
			phone: 8596089870,
			dob: Date.now(),
			password: "password123",
			height: "5'10",
			sex: "male",
			gender: ""
		},
		{
			id: "0d560384-5bce-46c9-94fb-5c5e8209f6dd",
			first_name: "Kemberly",
			last_name: "Eliscar",
			email: "keliscar@gmailcom",
			phone: 5024567894,
			dob: Date.now(),
			password: "password123",
			height: "5'10",
			sex: "female",
			gender: ""
		},
		{
			id: "46b97b6f-f3bf-494a-a840-44d3393d376f",
			first_name: "Jarrod",
			last_name: "Skahill",
			email: "jkahill@gmail.com",
			phone: 5024783254,
			dob: Date.now(),
			password: "password123",
			height: "5'10",
			sex: "male",
			gender: "male"
		},
	]);
};
