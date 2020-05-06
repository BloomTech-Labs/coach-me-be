const db = require("../data/db_config");
const httpError = require("http-errors");
const UserModel = require("./user-model");

class CoachModel extends UserModel {
	async getCoachList() {
		try {
			return await db("coach").select("id", "first_name", "last_name");
		} catch (error) {
			throw error;
		}
	}
	async addCoach(data) {
		try {
			return await db("coach").insert({
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				phone: data.phone,
				password: data.password,
			});
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
}

module.exports = new CoachModel();
