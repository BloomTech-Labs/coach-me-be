const supertest = require("supertest");
const server = require("../../index");
const db = require("../../data/db_config.js");
const coachRoute = "/api/coach";

describe("coach.js", () => {
	it("Should retrieve a list of coaches in DB", async () => {
		const response = await supertest(server).get(`${coachRoute}`);
		expect(response.status).toEqual(200);
	});
});

describe("coach.js", () => {
	it("Should retrieve a coach by their user ID", async () => {
		const response = await supertest(server).get(
			`${coachRoute}/11e30af8-b531-49b2-9387-2647dc76444a`
		);
		expect(response.status).toEqual(200);
	});
});

test("PUT route for updating coach by user ID", async () => {
	const res = await supertest(server)
		.put(`${coachRoute}/11e30af8-b531-49b2-9387-2647dc76444a`)
		.send({
			first_name: "First",
			last_name: "Last",
			email: "Update_email@gmail.com",
			phone: "654651321987",
			password: "PassWord1289",
		});
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
});

test("GET route for getting all clients assigned to a coaches user ID", async () => {
	const res = await supertest(server).get(
		`${coachRoute}/659918be-887a-4ce7-a5c7-29434aeb1cb7/clients`
	);
	expect(res.statusCode).toBe(200);
});

test("GET route for getting a client assigned to a coach by their client ID", async () => {
	const res = await supertest(server).get(
		`${coachRoute}/659918be-887a-4ce7-a5c7-29434aeb1cb7/clients/46b97b6f-f3bf-494a-a840-44d3393d376f`
	);
	expect(res.statusCode).toBe(200);
});

test("POST route that creates a session for a client that belongs to a specific coach", async () => {
	const res = await supertest(server)
		.post(
			`${coachRoute}/659918be-887a-4ce7-a5c7-29434aeb1cb7/clients/82ad6337-b099-4bd7-b0f7-6c0c316fe250/sessions`
		)
		.send({
			session_date: "2020-06-02",
			notes: "running test file",
		});
	expect(res.statusCode).toBe(201);
	expect(res.type).toBe("application/json");
});

test("GET route for sessions that belong to a specific client that are available only to their assigned coach", async () => {
	const res = await supertest(server).get(
		`${coachRoute}/659918be-887a-4ce7-a5c7-29434aeb1cb7/sessions/`
	);
	expect(res.statusCode).toBe(200);
});

test("GET route for getting a session by ID", async () => {
	const res = await supertest(server).get(
		`${coachRoute}/659918be-887a-4ce7-a5c7-29434aeb1cb7/sessions/de686852-7eae-4f63-91f3-f577f6bd9e85`
	);
	expect(res.statusCode).toBe(200);
});

test("GET route for getting a session by ID", async () => {
	const res = await supertest(server)
		.put(
			`${coachRoute}/659918be-887a-4ce7-a5c7-29434aeb1cb7/sessions/de686852-7eae-4f63-91f3-f577f6bd9e85`
		)
		.send({
			session_date: "2021-06-02",
			notes: "Update Notes",
		});
	expect(res.statusCode).toBe(200);
});
