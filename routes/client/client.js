const router = require('express').Router();

const healthDataRouter = require('./client-health-data');

const clientDB = require('../../models/client-model');

const authware = require('../../middleware/auth/globalAuth');
const pathValidator = require('../../middleware/pathValidator');

//router.use(authware.protected);
router.use('/:id', pathValidator.checkID);
// router.use('/:id', authware.private);
router.use('/:id/data', healthDataRouter);

router.get('/', async (req, res) => {
    try {
        res.json({clientPath: 'Client Path Reached'})
    } catch (error) {
        throw error;
    }
});

router.get('/:id', /*authware.private,*/ async (req, res) => {
    try {
        res.json( await clientDB.getUserById(req.params.id) );
    } catch (error) {
        throw error;
    }
});

router.put('/:id', /*authware.userOnly,*/ async(req, res) => {
    try {
        res.json( await clientDB.updateClientData(req.params.id, req.body) );
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;