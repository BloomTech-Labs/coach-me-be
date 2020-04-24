const router = require('express').Router();

router.use('/coach', require('./coachauth'));
router.use('/user', require('./userauth'));

module.exports = router;