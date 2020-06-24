const router = require('express').Router();
const UserModel = require('../../models/user-model');
const userDB = new UserModel();
const FileHandler = require("../../models/files-model");
const access = require('../../middleware/auth/globalPriv');


router.post('/upload_image', access.protected, async (req, res, next) =>{
    try {
        FileHandler.upload(req, res, async (error) =>{
            if(error){
                throw error;
            }
            const user = req.session.passport.user
            await userDB.updateProfileImage(user.id, req.file.location, user.type )
            return res.json('File uploaded.')
        })
    } catch (error) {
        next(error);
    }
});



module.exports = router;