const router = require('express').Router();
const httpError = require('http-errors');
const helper = require('../../utils/coachMeHelpers');

const healthDataRouter = require('./client-health-data');
const clientDB = require('../../models/client-model');

const authWare = require('../../middleware/auth/globalAuth');

/* MIDDLEWARE */
//router.use(authWare.protected);
// router.use('/:id', authWare.private);
router.use('/:id', require('../../middleware/pathValidator').checkID);

// Health Data Metrics
router.use('/:id/data', healthDataRouter);

/* Client Information */
router.get('/:id', /*authWare.private,*/ async (req, res) => {
    try {
        res.json( await clientDB.getUserById(req.params.id) );
    } catch (error) {
        helper.catchError(res, error);
    }
});

router.put('/:id', /*authWare.userOnly,*/ async(req, res) => {
    try {
        res.json( await clientDB.updateClientData(req.params.id, req.body) );
    } catch (error) {
        helper.catchError(res, error);
    }
});

/* Client-Coach Session Notes */
router.get('/:id/sessions', /*authWare.private,*/ async (req, res) => {
    try {
        const clientSessions = await clientDB.getCoachingSessions(req.params.id);
        if( clientSessions.length < 1 ) throw new httpError(404, 'No coaching session records found for that user.');
        res.json(clientSessions);
    } catch (error) {
        helper.catchError(res, error);
    }
})

module.exports = router;