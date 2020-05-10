const request = require("supertest");
const server = require("../../index");

const coachRoute = "/api/coach";

describe("coach.js", () => {
	it("Should retrieve a list of coaches in DB", async () => {
		const response = await request(server).get(`${coachRoute}`);
		expect(response.status).toEqual(200);
	});
});
