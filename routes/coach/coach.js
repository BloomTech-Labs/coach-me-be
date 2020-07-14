const router = require("express").Router();
const coachDB = require("../../models/coach-models");
const clientDB = require("../../models/client-model");
const access = require("../../middleware/auth/globalPriv");

/* MIDDLEWARE */
router.use("/:id", require("../../middleware/pathValidator").checkID);
router.use(access.protected);
router.use("/:id", access.private);

/*  
	'/coach'
	This endpoint retrieves all the coaches 
	registered in the database.
*/
router.get("/", async (req, res, next) => {
	try {
		const coachList = await coachDB.getCoachList();
		if (!coachList.length) res.status(404).json("No coaches found");
		res.status(200).json(coachList);
	} catch (error) {
		next(error);
	}
});
/*  
	GET
	'/coach/:id/' --> id is the coaches id
	'/coach/me --> this endpoint also works to get the currently logged in coaches profile
	This endpoint retrieves all the coaches 
	registered in the database.
*/
router.get("/:id", async (req, res, next) => {
	try {
		const id = req.userID;
		const profile = {
			...(await coachDB.getUserById(id, "coach")),
			password: null,
		};

		if (!profile.id) {
			return res.status(404).json("Coach profile not found");
		} else {
			res.status(200).json(profile);
		}
	} catch (error) {
		next(error);
	}
});
/*  
	PUT
	'/coach/:id'
	This endpoint retrieves a specific coach by their user id
	and allows them to update their information.
*/
router.put("/:id", async (req, res, next) => {
	try {
		const changes = req.body;
		res.json(await coachDB.updateCoachByID(req.params.id, changes));
	} catch (error) {
		next(error);
	}
});

/*
	'/coach/:id'
	This endpoint retrieves a specific coach by their user id
	and allows them to delete their account.
*/
router.delete("/:id", async (req, res, next) => {
	try {
		await coachDB.deleteCoach(req.params.id);
		req.session.destroy();
		return res
			.clearCookie("token")
			.json({ message: "Coach Account was deleted. Logged out Successfully." });
	} catch (error) {
		next(error);
	}
});

/*  
	GET
	'/coach/:id/clients'
	This endpoints retrieves all the clients that have
	been assigned to this coaches user ID.
*/
router.get("/:id/clients", async (req, res, next) => {
	try {
		res.status(200).json(await coachDB.getClientListByCoachID(req.params.id));
	} catch (error) {
		next(error);
	}
});

/*  
	GET
	'/coach/:id/clients'
	This endpoints retrieves all the clients that have
	been assigned to this coaches user ID.
*/
router.post("/:id/clients/:clientID", async (req, res, next) => {
	try {
		res.status(201).json( await coachDB.bindUsers(req.params.id, req.params.clientID) );
	} catch (error) {
		next(error);
	}
});

/*
	GET
	'/coach/:id/clients/:clientID'
	This endpoint retrieves a specific client by
	their ID that belongs to a specific coach ID
*/
router.get("/:id/clients/:clientID", async (req, res, next) => {
	try {
		res
			.status(200)
			.json(
				await coachDB.getCoachClientByID(req.params.id, req.params.clientID)
			);
	} catch (error) {
		next(error);
	}
});

/*  
	GET
	'/coach/:id/clients/:clientID/sessions'
	This route retrieves the specific client sessions belonging
	to a specific coach.
*/
router.get("/:id/clients/:clientID/sessions", async (req, res, next) => {
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
		next(error);
	}
});

/*  
	POST
	'/coach/:id/clients/:clientID/sessions'
*/
router.post("/:id/clients/:clientID/sessions", async (req, res, next) => {
	try {
		const { session_date, notes } = req.body;

		if (!session_date || !notes) {
			return await res.status(400).json({
				message: "Need session_date and notes",
			});
		}
		const payload = {
			session_date: session_date,
			notes: notes,
			coach_id: req.params.id,
			client_id: req.params.clientID,
		};
		res.status(201).json(await coachDB.addClientSession(payload));
	} catch (error) {
		next(error);
	}
});

/*	
	GET
	'/coach/:id/sessions'
	This endpoint retrieves all sessions that belong to
	a specific coaches ID.
*/
router.get("/:id/sessions", async (req, res, next) => {
	try {
		res.status(200).json(await coachDB.getCoachSessionsByID(req.params.id));
	} catch (error) {
		next(error);
	}
});

/* 
	GET
	'/coach/:id/sessions/:sessionID'
*/
router.get("/:id/sessions/:sessionID", async (req, res, next) => {
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
		next(error);
	}
});

/* 
	PUT
	'/coach/:id/sessions/:sessionID'
*/
router.put("/:id/sessions/:sessionID", (req, res, next) => {
	try {
		const { session_date, notes } = req.body;

		if (!session_date || !notes) {
			return res.status(400).json({
				message: "Need session_date and notes",
			});
		}

		const payload = {
			session_date: session_date,
			notes: notes,
		};

		res.json(coachDB.updateSessionByID(req.params.sessionID, payload));
	} catch (error) {
		next(error);
	}
});

/*
	GET
	'/coach/:id/client/:clientID/goals'
	This route retrieves the specific client goals belonging
	to a specific coach.
*/
router.get("/:id/clients/:clientID/goals", async (req, res, next) => {
	try {
		res
			.status(200)
			.json(
				await coachDB.getClientGoalsByClientID(
					req.params.id,
					req.params.clientID
				)
			);
	} catch (err) {
		next(err);
	}
});

router.get("/:id/clients/:clientID/goals/:goalID", async (req, res, next) => {
	try {
		res
			.status(200)
			.json(
				await coachDB.getClientGoalsByClientIDAndGoalID(
					req.params.goalID,
					req.params.clientID,
					req.params.id
				)
			);
	} catch (err) {
		next(err);
	}
});
/*
	POST
	add a client goal from the coach goal form for client
*/
router.post("/:id/clients/:clientID/goals", async (req, res, next) => {
	try {
		const { title, description, start_date, completed } = req.body;

		if (!start_date || !title || !description) {
			return await res.status(400).json({
				message: "Need all goal info",
			});
		}
		const payload = {
			coach_id: req.params.id,
			client_id: req.params.clientID,
			start_date: start_date,
			title: title,
			description: description,
			completed: completed,
		};

		res.status(201).json(await coachDB.addClientGoals(payload));
	} catch (err) {
		next(err);
	}
});
/*
	PUT
	updates a client goal from the coach goal form for client
*/
router.put("/:id/clients/:clientID/goals/:goalID", async (req, res, next) => {
	try {
		const { title, description, start_date, completed } = req.body;

		if (!start_date || !title || !description) {
			return await res.status(400).json({
				message: "Need all goal info",
			});
		}
		const payload = {
			coach_id: req.params.id,
			client_id: req.params.clientID,
			start_date: start_date,
			title: title,
			description: description,
			completed: completed,
		};

		res
			.status(201)
			.json(await coachDB.updateClientGoal(req.params.goalID, payload));
	} catch (err) {
		next(err);
	}
});

/*
DELETE
deletes goal by goalID
*/
router.delete(
	"/:id/clients/:clientID/goals/:goalID",
	async (req, res, next) => {
		try {
			return res
				.status(200)
				.json(await coachDB.deleteClientGoalbyID(req.params.goalID));
		} catch (error) {
			next(error);
		}
	}
);

router.get(`/:id/client_list/search`, async (req, res, next) => {
	try {
		const first_name = req.query.first_name;
		const last_name = req.query.last_name;
		console.log("first_name", first_name);
		console.log("req.params.id", req.params.id);

		res
			.status(200)
			.json(
				await coachDB.searchForClientinCoachList(
					first_name,
					last_name,
					req.params.id
				)
			);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
