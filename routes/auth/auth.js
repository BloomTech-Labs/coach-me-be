const router = require('express').Router();

router.use('/client', require('./client-auth'));

module.exports = router;