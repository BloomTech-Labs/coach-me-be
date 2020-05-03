const router = require('express').Router({mergeParams: true});
const clientDB = require('../../models/client-model');
const clientDataMiddleware = require('../../middleware/client-data/client-data-middleware');

router.get('/', clientDataMiddleware.needToKnow, async (req, res) => {
    try {
        res.json( await  clientDB.getHealthData( req.params.id, req.query?.count, req.query?.metrics ) );
    } catch (err){
        console.log('Here\'s the error: ', error)
        res.json(error);
    }
});

router.post('/', clientDataMiddleware.isClient, async (req, res) => {
    try {
        res.json( await clientDB.addHealthData( req.params.id, req.body ) );
    } catch (error){
        res.status(error.status ? error.status : 500).json({
            message: error.message ? error.message : "There was an internal server error."
        });
    }
});

module.exports = router;