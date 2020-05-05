const router = require("express").Router();
const coachDB = require("../../models/coach-models");
const helper = require("../../utils/coachMeHelpers");

/* MIDDLEWARE */
router.use("/:id", require("../../middleware/pathValidator").checkID);

//  '/coach'
router.get("/", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getCoachList());
	} catch (error) {
		next(error);
	}
});

//  '/coach/:id'
router.get("/:id", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getUserById(req.params.id, "coach"));
	} catch (error) {
		next(error);
	}
});

//  '/coach/:id/clients'
router.get("/:id/clients", async (req, res) => {
	try {
	} catch (error) {}
});

//  '/coach/:id/clients/:clientID'
//  '/coach/:id/sessions'

//  GET, POST, PUT, DELETE
//  '/coach/:id/sessions/:clientID'

//  GET, PUT, DELETE
//  '/coach/:id/sessions/:sessionID'

module.exports = router;
