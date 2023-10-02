"use strict";
exports.__esModule = true;
exports.upload = void 0;
//for validation like acceptable file types, max file size etc
var path_1 = require("path"); // imports the Node.js path module, which provides utilities for working with file and directory paths
var multer_1 = require("multer"); //used for file uploads
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
//this code sets up a multer storage engine (diskStorage) with a specific destination directory (uploads/)
// for storing uploaded files and generates filenames based on the current timestamp and 
//the original file extension. This storage configuration can be used when configuring a multer 
//middleware to handle file uploads in a Node.js application
exports.upload = multer_1["default"]({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg") {
            callback(null, true);
        }
        else {
            console.log('only jpg & png file supported!');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});
