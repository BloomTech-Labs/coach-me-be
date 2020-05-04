const router = require("express").Router();
const coachDB = require("../../models/coach-models");

router.get("/", async (req, res) => {
	try {
		res.status(200).json(await coachDB.getCoachList());
	} catch (error) {
		next(error);
	}
});

module.exports = router;
