const router = require('express').Router();

router.use('/coach', require('./coach-auth'));
router.use('/user', require('./client-auth'));

module.exports = router;