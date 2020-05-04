const router = require("express").Router();
const CoachRouter = require("./coach/coach.js");

router.use("/auth", require("./auth/auth"));
router.use("/coach", CoachRouter);

module.exports = router;
