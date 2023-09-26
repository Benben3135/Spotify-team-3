"use strict";
exports.__esModule = true;
exports.deleteSong = exports.uploadSong = void 0;
var songModel_1 = require("./songModel");
var mongoose_1 = require("mongoose");
var multer = require('multer');
var methodOverride = require('method-override');
var crypto = require('crypto');
var path = require('path');
var GridFsStorage = require('multer-gridfs-storage');
var config = require('./config'); // Contains env. and other configs
//upload a file
var storage = new GridFsStorage({
    url: config.mongoURI,
    file: function (req, file) {
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(16, function (err, buf) {
                if (err) {
                    return reject(err);
                }
                var filename = buf.toString('hex') + path.extname(file.originalname);
                var fileInfo = {
                    filename: filename,
                    bucketName: 'songUploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
var upload = multer({ storage: storage });
exports.uploadSong = (upload.single("file"), function (req, res, next) {
    var newSong = new songModel_1.Song({
        caption: req.body.caption,
        filename: req.file.filename,
        fileId: req.file.id
    });
    newSong
        .save()
        .then(function (song) {
        res.status(200).json({
            message: 'File uploaded successfuly.',
            song: song
        });
    })["catch"](function (err) { return res.status(500).json(err); });
});
//   .catch((err) => res.status(500).json(err));
// });
var url = config.mongoURI;
var connect = mongoose_1["default"].createConnection(url, {});
var gridFS;
connect.once('open', function () {
    // initialize stream
    gridFS = new mongoose_1["default"].mongo.GridFSBucket(connect.db, {
        bucketName: "songUploads"
    });
});
//Delete a particular file using its ObjectId
exports.deleteSong = (function (req, res, next) {
    gridFS["delete"](new mongoose_1["default"].Types.ObjectId(req.params.id), function (err, data) {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.status(200).json({
            success: true,
            message: "File successfully deleted"
        });
    });
});
