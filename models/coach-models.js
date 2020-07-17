const db = require("../data/db_config");
const httpError = require("http-errors");
const UserModel = require("./user-model");
const ClientModel = require("./client-model");

class CoachModel extends UserModel {
	async getCoachList() {
		try {
			return await db("coach").select(
				"id",
				"first_name",
				"last_name",
				"email",
				"phone"
			);
		} catch (error) {
			throw error;
		}
	}

	async getCoachByID(id) {
		try {
			return await db("coach")
				.where({ id })
				.select("id", "first_name", "last_name", "email", "phone");
		} catch (error) {
			throw error;
		}
	}

	async addCoach(data) {
		try {
			return await db("coach").insert({
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email.toLowerCase(),
				phone: data.phone,
				password: data.password,
			});
		} catch (error) {
			throw error;
		}
	}

	async updateCoachByID(id, data) {
		try {
			return await db("coach")
				.where({ id })
				.update({
					first_name: data.first_name,
					last_name: data.last_name,
					email: data.email,
					phone: data.phone,
					password: data.password,
				})
				.then((data) => data);
		} catch (error) {
			throw error;
		}
	}

	async deleteCoach(id) {
		try {
			return await db("coach").where({ id }).del();
		} catch (error) {
			throw error;
		}
	}

	async getClientListByCoachID(id) {
		try {
			return await db("coach_client as cc")
				.join("client as cl", "cl.id", "cc.client_id")
				.where("cc.coach_id", id)
				.select("cc.coach_id", "cl.id", "cl.first_name", "cl.last_name");
		} catch (error) {
			throw error;
		}
	}

	async searchForClientinCoachList(firstname, lastname, id) {
		try {
			return await db("coach_client as cc")
				.join("client as cl", "cl.id", "cc.client_id")
				.where("cc.coach_id", id)
				.where("first_name", "like", `%${firstname}%`)
				.orWhere("last_name", "like", `%${lastname}%`)
				.select("cl.id", "cl.first_name", "cl.last_name");
		} catch (error) {
			throw error;
		}
	}

	async getCoachClientByID(id, clientID) {
		try {
			return await db("coach_client as cc")
				.join("client as cl", "cl.id", "cc.client_id")
				.where("cc.coach_id", id)
				.where("cl.id", clientID)
				.select("cc.coach_id", "cl.first_name", "cl.last_name");
		} catch (error) {
			throw error;
		}
	}

	async getCoachSessionsByID(id) {
		try {
			return await db("sessions as s")
				.where("s.coach_id", id)
				.select(
					"s.id",
					"s.session_date",
					"s.submitted_at",
					"s.coach_id",
					"s.client_id",
					"s.notes"
				);
		} catch (error) {
			throw error;
		}
	}

	async getCoachSessionsByClientID(id, clientID) {
		try {
			return await db("sessions as s")
				.where("s.coach_id", id)
				.where("s.client_id", clientID)
				.select(
					"s.id",
					"s.session_date",
					"s.submitted_at",
					"s.coach_id",
					"s.client_id",
					"s.notes"
				);
		} catch (error) {
			throw error;
		}
	}

	async getCoachSessionsBySessionID(id, sessionID) {
		try {
			return await db("sessions as s")
				.where("s.coach_id", id)
				.where("s.id", sessionID)
				.select(
					"s.id",
					"s.session_date",
					"s.submitted_at",
					"s.coach_id",
					"s.client_id",
					"s.notes"
				);
		} catch (error) {
			throw error;
		}
	}

	async updateSessionByID(sessionID, session) {
		try {
			return await db("sessions")
				.where("id", sessionID)

				// .where("client_id", id)
				.update(session)
				.then((data) => data);
		} catch (error) {
			throw error;
		}
	}

	//	=== Goals ===
	async getClientGoalsByClientID(coachID, clientID) {
		try {
			return await db("client_goals")
				.where("coach_id", coachID)
				.andWhere("client_id", clientID)
				.select("id", "title", "description", "start_date", "completed");
		} catch (err) {
			throw err;
		}
	}

	async getClientGoalsByClientIDAndGoalID(id, clientID, coachID) {
		try {
			return await db("client_goals")
				.where("id", id)
				.andWhere("client_id", clientID)
				.andWhere("coach_id", coachID)
				.select("id", "title", "description", "start_date", "completed");
		} catch (err) {
			throw err;
		}
	}

	async addClientGoals(goal) {
		try {
			return await db("client_goals")
				.insert(goal)
				.then(() => goal);
		} catch (error) {
			throw error;
		}
	}

	async updateClientGoal(goalID, goal) {
		try {
			return await db("client_goals")
				.where("id", goalID)
				.update({
					coach_id: goal.coach_id,
					client_id: goal.client_id,
					title: goal.title,
					description: goal.description,
					start_date: goal.start_date,
					completed: goal.completed,
				})
				.then(() => goal);
		} catch (error) {
			throw error;
		}
	}

	async deleteClientGoalbyID(goalID) {
		try {
			return await db("client_goals").where("id", goalID).del();
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new CoachModel();
