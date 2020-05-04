const router = require('express').Router({mergeParams: true});
const helper = require('../../utils/coachMeHelpers');
const clientDB = require('../../models/client-model');

const access = require('../../middleware/auth/globalPriv');

router.get('/', /*access.private,*/ async (req, res) => {
    try {
        res.json( await clientDB.getHealthData( req.params.id, req.query?.count, req.query?.metrics ) );
    } catch (error){
        helper.catchError(res, error);
    }
});

router.post('/', /*access.userOnly,*/ async (req, res) => {
    try {
        res.json( await clientDB.addHealthData( req.params.id, req.body ) );
    } catch (error){
        helper.catchError(res, error);
    }
});

router.get('/:instanceID', /*access.private,*/ async (req, res) => {
    try {
        res.json( await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id) );
    } catch (error){
        helper.catchError(res, error);
    }
});

router.put('/:instanceID', /*access.userOnly,*/ async (req, res) => {
    try {
        res.json( await clientDB.updateMetricData(req.params.instanceID, req.body) );
    } catch (error){
        helper.catchError(res, error);
    }
});

module.exports = router;