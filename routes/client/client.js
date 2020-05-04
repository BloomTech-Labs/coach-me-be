const router = require('express').Router();
const httpError = require('http-errors');
const helper = require('../../utils/coachMeHelpers');

const healthDataRouter = require('./client-health-data');
const clientDB = require('../../models/client-model');

const access = require('../../middleware/auth/globalPriv');

/* MIDDLEWARE */
//router.use(access.protected);
router.use('/:id', access.private);
router.use('/:id', require('../../middleware/pathValidator').checkID);

// Health Data Metrics
router.use('/:id/data', healthDataRouter);

/* Client Information */
router.get('/:id', async (req, res) => {
    try {
        res.json( await clientDB.getUserById(req.params.id) );
    } catch (error) {
        helper.catchError(res, error);
    }
});

router.put('/:id', /*access.userOnly,*/ async(req, res) => {
    try {
        res.json( await clientDB.updateClientData(req.params.id, req.body) );
    } catch (error) {
        helper.catchError(res, error);
    }
});

router.delete('/:id', access.userOnly, async(req, res) => {
    try {
        await clientDB.deleteClient(req.params.id);
        req.session.destroy();
        return res.clearCookie('token').json('Account deleted. Logged out successfully.');
    } catch (error) {
        helper.catchError(res, error);
    }
})

/* Client-Coach Session Notes */
router.get('/:id/sessions', async (req, res) => {
    try {
        const clientSessions = await clientDB.getCoachingSessions(req.params.id);
        if( clientSessions.length < 1 ) throw new httpError(404, 'No coaching session records found for that user.');
        res.json(clientSessions);
    } catch (error) {
        helper.catchError(res, error);
    }
});

module.exports = router;