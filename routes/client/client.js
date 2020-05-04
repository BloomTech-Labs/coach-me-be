const router = require('express').Router();
const httpError = require('http-errors');
const helper = require('../../utils/coachMeHelpers');

const healthDataRouter = require('./client-health-data');
const clientDB = require('../../models/client-model');
const CoachingSessions = require('../../models/coaching-session-model');

const authware = require('../../middleware/auth/globalAuth');
const pathValidator = require('../../middleware/pathValidator');

/* MIDDLEWARE */
//router.use(authware.protected);
router.use('/:id', pathValidator.checkID);
// router.use('/:id', authware.private);

// Health Data Metrics
router.use('/:id/data', healthDataRouter);

/* Client Information */
router.get('/:id', /*authware.private,*/ async (req, res) => {
    try {
        res.json( await clientDB.getUserById(req.params.id) );
    } catch (error) {
        helper.catchError(res, error);
    }
});

router.put('/:id', /*authware.userOnly,*/ async(req, res) => {
    try {
        res.json( await clientDB.updateClientData(req.params.id, req.body) );
    } catch (error) {
        helper.catchError(res, error);
    }
});

/* Client-Coach Session Notes */
router.get('/:id/sessions', /*authware.private,*/ async (req, res) => {
    try {
        const clientSessions = await CoachingSessions.getUserSessions(req.params.id);
        if( clientSessions.length < 1 ) throw new httpError(404, 'No coaching session records found for that user.');
        res.json(clientSessions);
    } catch (error) {
        helper.catchError(res, error);
    }
})

module.exports = router;