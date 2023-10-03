//for validation like acceptable file types, max file size etc
import express from "express";
import fileUpload from 'express-fileupload';
import path from 'path' // imports the Node.js path module, which provides utilities for working with file and directory paths
import multer from 'multer' //used for file uploads
const app = express();
app.use(fileUpload());
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        //determines the destination directory where the uploaded files will be stored
        cb(null, 'uploads/')   //cd=callback function
    },
    filename: function(req,file,cb) {
        //rename a file with current timestamp and the extension
        let ext = path.extname(file.originalname)
        cb(null, Date.now()+ ext)
    }
})



export const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        const allowedExtensions = ['.mp3', '.mpeg'];

        // Get the file extension
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
            callback(null, true);
        } else {
            console.log('Only mp3 & mpeg files are supported!');
            callback(null, false);
        }
    },
});

// export const upload = multer ({
//     storage: storage,
//     fileFilter: function(req,file,callback) {
//         if(
//             file.mimetype == "image/png" ||
//             file.mimetype == "image/jpeg"
//         ){
//             callback(null,true)
//         }else {
//             console.log('only jpg & png file supported!')
//             callback(null, false)
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// })

