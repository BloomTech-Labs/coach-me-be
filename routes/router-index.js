const router = require("express").Router();

router.use("/auth", require("./auth/auth"));
router.use("/client", require("./client/client"));
router.use("/coach", require("./coach/coach.js"));
router.use("/media", require("./media/media-route"));

module.exports = router;
