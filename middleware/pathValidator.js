const httpError = require("http-errors");
const UserModel = require("../models/user-model");
const User = new UserModel();

class PathValidator {
	/***
	 * The checkID middleware verifies that the requested ID is valid and returns a 404 if the ID is not found in the designated DB Table.
	 */
	async checkID(req, res, next) {
		try {
			const type = req.baseUrl.split("/")[2];
			const userID = await User.getUserById(req.params.id, type);
			if (!userID)
				throw new httpError(404, `No user with ID:${req.params.id} found.`);
			next();
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new PathValidator();
