const router = require('express').Router();
const healthDataRouter = require('./client-health-data');
const clientDB = require('../../models/client-model');

router.use('/:id/data', healthDataRouter);

router.get('/', async (req, res) => {
    try {
        res.json({clientPath: 'Client Path Reached'})
    } catch (error) {
        throw error;
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json( await clientDB.getUserById(req.params.id) );
    } catch (error) {
        throw error;
    }
});

module.exports = router;