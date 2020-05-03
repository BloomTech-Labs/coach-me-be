const router = require('express').Router();

router.use('/auth', require('./auth/auth'));
router.use('/client', require('./client/client'));
// router.use('/coach', require('./coach/coach'));


module.exports = router;