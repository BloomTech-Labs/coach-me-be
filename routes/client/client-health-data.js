const router = require('express').Router({mergeParams: true});
const clientDB = require('../../models/client-model');

const access = require('../../middleware/auth/globalPriv');

router.get('/', /*access.private,*/ async (req, res, next) => {
    try {
        const metrics = await clientDB.getHealthData( req.params.id, req.query?.count, req.query?.metrics );
        if( ! metrics.length ) res.status(404).json('No health metric records found for that user.');
        res.json(  );
    } catch (error){
        next(error)
    }
});

router.post('/', /*access.userOnly,*/ async (req, res, next) => {
    try {
        res.status(201).json( await clientDB.addHealthData( req.params.id, req.body ) );
    } catch (error){
        next(error)
    }
});

router.get('/:instanceID', /*access.private,*/ async (req, res, next) => {
    try {
        const instance = await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id);
        if( ! instance ) res.status(404).json('Invalid Instance ID');
        res.json( instance );
    } catch (error){
        next(error)
    }
});

router.put('/:instanceID', /*access.userOnly,*/ async (req, res, next) => {
    try {
        const instance = await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id);
        if( ! instance ) res.status(404).json('Invalid Instance ID');
        res.json( await clientDB.updateMetricData(req.params.instanceID, req.body) );
    } catch (error){
        next(error)
    }
});

router.delete('/:instanceID', /*access.userOnly,*/ async (req, res, next ) => {
    try {
        const instance = await clientDB.getHealthDataInstance(req.params.instanceID, req.params.id);
        if( ! instance ) res.status(404).json('Invalid Instance ID');
        res.json( await clientDB.deleteMetricInstance(req.params.instanceID) );
    } catch (error){
        next(error)
    }
});

module.exports = router;