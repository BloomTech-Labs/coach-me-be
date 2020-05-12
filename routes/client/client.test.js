const request = require("supertest");
const server = require("../../index");

const clientRoute = "/api/client";

describe("client.js", () => {
	it("Should require authentication for access", async () => {
		const response = await request(server).get(
			`${clientRoute}/d322ddbd-026d-4c29-8aea-fd7ae18ef572`
		);
		expect(response.status).toEqual(500);
	});
});
