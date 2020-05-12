const supertest = require("supertest");
const server = require("../../index");

const coachRoute = "/api/coach";

// beforeAll(async () => {
// 	await db.seed.run();
// });

// afterAll(async () => {
// 	await db.destroy();
// });

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

// describe("coach.js", () => {
// 	it("Should update coach by user ID", async () => {
// 		const response = await supertest(server)
// 			.put(`${coachRoute}/11e30af8-b531-49b2-9387-2647dc76444a`)
// 			.send({
// 				first_name: "Update First Name",
// 				last_name: "Update Last Name",
// 				email: "Update_email@gmail.com",
// 				phone: "654651321987",
// 				password: "PassWord128",
// 			});
// 		expect(response.status).toEqual(200);
// 		// expect(res.type).toBe("application/json");
// 		// expect(res.response).toBe(1);
// 	});
// });

test("PUT route for updating coach by user ID", async () => {
	const res = await supertest(server)
		.put(`${coachRoute}/11e30af8-b531-49b2-9387-2647dc76444a`)
		.send({
			first_name: "Update First Name",
			last_name: "Update Last Name",
			email: "Update_email@gmail.com",
			phone: "654651321987",
			password: "PassWord128",
		});
	expect(res.statusCode).toBe(200);
});
