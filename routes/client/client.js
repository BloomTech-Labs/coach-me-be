const router = require("express").Router();

const healthDataRouter = require("./client-health-data");
const clientDB = require("../../models/client-model");

const access = require("../../middleware/auth/globalPriv");

/* MIDDLEWARE */

router.use("/:id", require("../../middleware/pathValidator").checkID);
//router.use(access.protected);
// router.use('/:id', access.private);

/* Health Data Metrics */
router.use("/:id/data", healthDataRouter);

/* Client Information */
router.get("/:id", async (req, res, next) => {
	try {
		const client = await clientDB.getUserById(req.params.id);
		console.log(client);
		if (!client) res.status(404).json("No client found with that ID.");
		res.json({ ...client, password: null });
	} catch (error) {
		next(error);
	}
});

router.put(
	"/:id",
	/*access.userOnly,*/ async (req, res, next) => {
		try {
			res.json(await clientDB.updateClientData(req.params.id, req.body));
		} catch (error) {
			next(error);
		}
	}
);

router.delete("/:id", access.userOnly, async (req, res, next) => {
	try {
		await clientDB.deleteClient(req.params.id);
		req.session.destroy();
		return res
			.clearCookie("token")
			.json("Account deleted. Logged out successfully.");
	} catch (error) {
		next(error);
	}
});

/* Client-Coach Session Notes */
router.get("/:id/sessions", async (req, res, next) => {
	try {
		const clientSessions = await clientDB.getCoachingSessions(req.params.id);
		if (clientSessions.length < 1)
			res.status(404).json("No coaching session records found for that user.");
		res.json(clientSessions);
	} catch (error) {
		next(error);
	}
});

router.get("/:id/sessions/:sessionID", async (req, res, next) => {
	try {
		const clientSession = await clientDB.getCoachingSession(
			req.params.sessionID,
			req.params.id
		);
		if (clientSession.length < 1)
			res
				.status(404)
				.json("No coaching session records found for that session ID.");
		res.json(clientSession);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
