"use strict";
exports.__esModule = true;
exports.upload = void 0;
//for validation like acceptable file types, max file size etc
var express_1 = require("express");
var express_fileupload_1 = require("express-fileupload");
var path_1 = require("path"); // imports the Node.js path module, which provides utilities for working with file and directory paths
var multer_1 = require("multer"); //used for file uploads
var app = express_1["default"]();
app.use(express_fileupload_1["default"]());
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        //determines the destination directory where the uploaded files will be stored
        cb(null, 'uploads/'); //cd=callback function
    },
    filename: function (req, file, cb) {
        //rename a file with current timestamp and the extension
        var ext = path_1["default"].extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
exports.upload = multer_1["default"]({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var allowedExtensions = ['.mp3', '.mpeg'];
        // Get the file extension
        var fileExtension = path_1["default"].extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            callback(null, true);
        }
        else {
            console.log('Only mp3 & mpeg files are supported!');
            callback(null, false);
        }
    }
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
