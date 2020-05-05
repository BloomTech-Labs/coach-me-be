const router = require("express").Router();
const coachDB = require("../../models/coach-models");
const helper = require("../../utils/coachMeHelpers");

/* MIDDLEWARE */
// router.use("/:id", require("../../middleware/pathValidator").checkID);

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
//	GET
//  '/coach/:id/clients/:clientID'

//	GET
//  '/coach/:id/sessions'

//  GET, POST, (PUT?, DELETE?)
//  '/coach/:id/sessions/:clientID'

//  GET, PUT, (DELETE?)
//  '/coach/:id/sessions/:sessionID'

module.exports = router;
