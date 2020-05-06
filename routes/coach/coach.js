const router = require("express").Router();
const coachDB = require("../../models/coach-models");
const helper = require("../../utils/coachMeHelpers");

/* MIDDLEWARE */
router.use("/:id", require("../../middleware/pathValidator").checkID);

/*  
	'/coach'
	This endpoint retrieves all the coaches 
	registered in the database.
*/
router.get("/", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getCoachList());
	} catch (error) {
		helper.catchError(res, error);
	}
});

/*  
	'/coach/:id'
	This endpoint retrieves a specific coach by their user id.
*/
router.get("/:id", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getUserById(req.params.id, "coach"));
	} catch (error) {
		helper.catchError(res, error);
	}
});

/*  
	'/coach/:id/clients'
	This endpoints retrieves all the clients that have
	been assigned to this coaches user ID.
*/
router.get("/:id/clients", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getClientListByCoachID(req.params.id));
	} catch (error) {
		helper.catchError(res, error);
	}
});
/*
	GET
	'/coach/:id/clients/:clientID'
	This endpoint retrieves a specific client by
	their ID that belongs to a specific coach ID
*/
router.get("/:id/clients/:clientID", async (req, res) => {
	try {
		res
			.status(200)
			.json(
				await coachDB.getCoachClientByID(req.params.id, req.params.clientID)
			);
	} catch (error) {
		helper.catchError(res, error);
	}
});

/*	
	GET
	'/coach/:id/sessions'
	This endpoint retrieves all sessions that belong to
	a specific coaches ID.
*/
router.get("/:id/sessions", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getCoachSessionsByID(req.params.id));
	} catch (error) {
		helper.catchError(res.error);
	}
});

/*  
	GET
	'/coach/:id/sessions/:clientID'
	This route retrieves the specific client sessions belonging
	to a specific coach.
*/
router.get("/:id/sessions/:clientID", async (req, res) => {
	try {
		res
			.status(200)
			.json(
				await coachDB.getCoachSessionsByClientID(
					req.params.id,
					req.params.clientID
				)
			);
	} catch (error) {
		helper.catchError(res.error);
	}
});

//  POST, (PUT?, DELETE?)
//  '/coach/:id/sessions/:clientID'

//  GET, PUT, (DELETE?)
//  '/coach/:id/sessions/:sessionID'
router.get("/:id/sessions/session/:sessionID", async (req, res) => {
	try {
		res
			.status(200)
			.json(
				await coachDB.getCoachingSession(
					req.params.sessionID,
					req.params.id,
					"coach"
				)
			);
	} catch (error) {
		helper.catchError(res.error);
	}
});

module.exports = router;
