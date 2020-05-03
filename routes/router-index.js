const router = require("express").Router();

router.use("/auth", require("./auth/auth"));
router.use("/coach", require("./coach/coach"));

module.exports = router;
