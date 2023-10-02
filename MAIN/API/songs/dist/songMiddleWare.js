"use strict";
exports.__esModule = true;
exports.upload = void 0;
//for validation like acceptable file types, max file size etc
var path_1 = require("path");
var multer_1 = require("multer");
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        //locatiion where the file will be saved
        cb(null, 'uploads/');
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
