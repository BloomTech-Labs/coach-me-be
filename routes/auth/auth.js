const router = require('express').Router();

router.use('/coach', require('./coach-auth'));
router.use('/client', require('./client-auth'));

module.exports = router;