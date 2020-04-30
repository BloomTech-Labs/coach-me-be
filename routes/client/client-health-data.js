const router = require('express').Router({mergeParams: true});
const clientDB = require('../../models/client-model');


router.get('/', async (req, res) => {
    try {
        res.json( await  clientDB.getHealthData(req.params.id, req.query?.count, req.query?.metrics) )
    } catch (err){
        throw err;
    }
});

router.post('/', async (req, res) => {
    try {
        return null;
    } catch (err){
        throw err;
    }
});

module.exports = router;