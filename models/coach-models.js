const db = require("../data/db_config");
const UserModel = require("./user-model");

class CoachModel extends UserModel {
	async addCoach(data) {
		await db("coach").insert({
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
			password: data.password,
		});
	}
}

module.exports = new CoachModel();
