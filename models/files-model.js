
const aws = require('aws-sdk');
const multerS3 = require("multer-s3");
const multer = require('multer');
const path = require('path');
const url = require('url');


class FilesModel{
    constructor(){
       this.s3;
       this.upload;
       this.initialize();
    }

    initialize(){
        this.s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_ACCESS_SECRET,
            Bucket: process.env.AWS_S3_BUCKET
        });


        this.upload = multer({
            storage: multerS3({
                s3: this.s3,
                bucket: 'coachme',
                acl: 'public-read',
                key: function(req, file, cb){
                    cb(null, `${req.session?.passport?.user?.id}/avatar/${path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname )}` )

                }
            }),
            limits:{ fileSize: 8000000 },
            fileFilter: (req, file, cb) =>{
                this.isFileAnImage(file, cb);
            }
        }).single('profile_image');
    }

    isFileAnImage(file, cb){
        const filetypes = /jpeg|jpg|png|gif|bmp|svg/;
        const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
        const mimetype = filetypes.test( file.mimetype );
        if( mimetype && extname ){
            return cb( null, true );
        } else {
            cb( 'Error: Images Only!' );
        }

    }
}


module.exports = new FilesModel();

