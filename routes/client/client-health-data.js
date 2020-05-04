const router = require('express').Router({mergeParams: true});
const httpError = require('http-errors');

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
        const instance = await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id);
        if( ! instance ) throw new httpError(404, 'Invalid instance ID');
        res.json( await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id) );
    } catch (error){
        helper.catchError(res, error);
    }
});

router.put('/:instanceID', /*access.userOnly,*/ async (req, res) => {
    try {
        const instance = await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id);
        if( ! instance ) throw new httpError(404, 'Invalid instance ID');
        res.json( await clientDB.updateMetricData(req.params.instanceID, req.body) );
    } catch (error){
        helper.catchError(res, error);
    }
});

router.delete('/:instanceID', /*access.userOnly,*/ async (req, res) => {
    try {
        const instance = await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id);
        if( ! instance ) throw new httpError(404, 'Invalid instance ID');
        res.json( await clientDB.deleteMetricInstance(req.params.instanceID) );
    } catch (error){
        helper.catchError(res, error);
    }
});

module.exports = router;