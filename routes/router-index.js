const router = require("express").Router();
const CoachRouter = require("./coach/coach.js");

router.use('/auth', require('./auth/auth'));
router.use('/client', require('./client/client'));
router.use("/coach", CoachRouter);


module.exports = router;
