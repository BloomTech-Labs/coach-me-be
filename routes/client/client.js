const router = require('express').Router();
const healthDataRouter = require('./client-health-data');
const clientDB = require('../../models/client-model');
const clientDataMiddleware = require('../../middleware/client-data/client-data-middleware');

router.use('/:id', clientDataMiddleware.checkID);
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

router.put('/:id', clientDataMiddleware.isClient ,async(req, res) => {
    try {
        res.json( await clientDB.updateClientData(req.params.id, req.body) );
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;