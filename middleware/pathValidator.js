const httpError = require("http-errors");
const UserModel = require("../models/user-model");
const User = new UserModel();

class PathValidator {
	/***
	 * The checkID middleware verifies that the requested ID is valid and returns a 404 if the ID is not found in the designated DB Table.
	 */
	async checkID(req, res, next) {
		try {
			const id = req.params.id === "me" ? req.session?.passport?.user?.id : req.params.id;
			//if( !id ) return res.status(401).json('Unauthorized: No current session.');
			req.userID = id;
			const type = req.baseUrl.split("/")[2];
			const userID = await User.getUserById(id, type);
			if (!userID) return res.status(404).json(`No user with ID:${id} found.`);
			next();
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new PathValidator();