const request = require("supertest");
const server = require("../../index");


describe("../router/auth/auth.js", () => {
	it("Client Login request must contain all required fields.", async () => {
		const response = await request(server).post('/api/auth/register?user_type=client').send({
		     first_name: "Brian",
           last_name: "Taveras",
           email: `${Math.random() * 10}@coachme.me`,
           phone: 3474909007,
           dob: "Dec 17 1994",
           password: "Password12*",
           confirm_password: "Password12*",
           height: 57,
           sex: "male",
           gender: "male"
		});
		expect(response.status).toEqual(200);
	});
});

describe("../router/auth/auth.js", () => {
	it("Coach Login request must contain all required fields.", async () => {
		const response = await request(server).post('/api/auth/register?user_type=coach').send({
		first_name: "Brian",
           last_name: "Taveras",
           email: `${Math.random() * 10}@coachme.me`,
           phone: 3474909007,
           dob: "Dec 17 1994",
           password: "Password12*",
           confirm_password: "Password12*",
           gender: "male"
		});
		expect(response.status).toEqual(200);
	});
});
