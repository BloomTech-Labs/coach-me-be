
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
            s3: this.s3,
            bucket: 'coachme',
            acl: 'public-read',
            key: (req, file, cb) =>{
                cb(null, path.basename(file.originalname, path.extname(file.originalname)) + Date.now() + path.extname(file.originalname))
            },
            limits: {fileSize: 8000000},
            fileFilter: (file, cb) =>{
                this.checkFileType(file, cb);
            }
        }).single('profile_image');
    }
    checkFileType(file, cb){
        const file_types = /jpeg|jpg|png|gif/;
        const extname = file_types.test(path.extname(file.originalname).toLocaleLowerCase());
        const mimetype = file_types.test(file.mimetype);
        if(mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: File is not a supported format.');
    }

}


module.exports = new FilesModel();

