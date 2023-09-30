"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.uploadSong = exports.storage = void 0;
var songModel_1 = require("./songModel");
var mongoose_1 = require("mongoose");
var multer_1 = require("multer");
var method_override_1 = require("method-override");
var crypto_1 = require("crypto");
var path_1 = require("path");
var express_1 = require("express");
var app = express_1["default"]();
var multer_gridfs_storage_1 = require("multer-gridfs-storage");
var MONGO_URI = process.env.MONGO_URI;
var connect = mongoose_1["default"].createConnection(MONGO_URI);
var gridFS;
connect.once('open', function () {
    // initialize stream
    gridFS = new mongoose_1["default"].mongo.GridFSBucket(connect.db, {
        bucketName: "songUploads"
    });
});
// const config = require('./config'); // Contains env. and other configs
// connect to mongoDB with mongoose
app.use(method_override_1["default"]('_method'));
mongoose_1["default"].connect(MONGO_URI).then(function () {
    console.info("MongoSongDB connected");
})["catch"](function (err) {
    console.error(err);
});
//upload a file
exports.storage = new multer_gridfs_storage_1.GridFsStorage({
    url: MONGO_URI,
    file: function (req, file) {
        return new Promise(function (resolve, reject) {
            crypto_1["default"].randomBytes(16, function (err, buf) {
                if (err) {
                    return reject(err);
                }
                var filename = buf.toString('hex') + path_1["default"].extname(file.originalname);
                var fileInfo = {
                    filename: filename,
                    bucketName: 'songUploads',
                    metadata: {
                        // Add metadata based on your schema
                        title: req.body.title,
                        genre: req.body.genre
                    }
                };
                console.log("new file created");
                resolve(fileInfo);
            });
        });
    }
});
var upload = multer_1["default"]({ storage: exports.storage });
function uploadSong() {
    var _this = this;
    upload.single('file'), function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _a, filename, file, metadata, song, songDB, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.file);
                    console.log(req.body);
                    _a = req.file, filename = _a.filename, file = _a.file, metadata = _a.metadata;
                    console.log({ filename: filename, metadata: metadata });
                    if (!filename || !file)
                        throw new Error('please fill all fields');
                    song = new songModel_1.SongModel({
                        filename: filename,
                        file: file,
                        title: metadata.title,
                        genre: metadata.genre
                    });
                    console.log(song);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, song.save()];
                case 2:
                    songDB = _b.sent();
                    res.status(200).json({
                        message: 'File uploaded successfully.',
                        songDB: songDB
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    res.status(500).json(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
}
exports.uploadSong = uploadSong;
//   export const getSong = async(req:any, res:any)=>{
//     try {
//         const songDB = await SongModel.find({});
//         res.send({songs:songDB})
//     } catch (error) {
//         console.error(error)
//     }
// }
// const song = new SongModel({
//     filename: __filename,
//     file: File,
//     title: metadata.title,
//     genre: metadata.genre,
// });
// console.log(song);
// try {
//     const songDB = await song.save();
//     res.status(200).json({
//         message: 'File uploaded successfully.',
//         songDB,
//     });
// } catch (err) {
//     res.status(500).json(err);
// }
// });
// export const uploadSong = (upload.single("file"), async(req:any, res:any, next:any) => {
//   console.log(req.file) //after it will return the value of file
//   console.log(req.body)
//   const {  filename,file, metadata } = req.body;
//   console.log({ filename,file, metadata });
//   if(!filename || !file) throw new Error("please fill all fileds")
//   const song = new Song({
//      filename:filename,
//      file:file,title: metadata.title,
//      genre: metadata.genre,
//     })
//     console.log(song)
//   const songDB = await song.save()
//       .then((songDB) => {
//         res.status(200).json({
//           message: 'File uploaded successfuly.',
//           songDB,
//         });
//       })
//       .catch((err) => res.status(500).json(err));
//   })
// export const uploadSong = (upload.single("file"), (req, res, next) => {
//   console.log(req.file) //after it will return the value of file
//   console.log(req.body)
//     let newSong = new Song({
//       caption: req.body.caption,
//       filename: req.file.filename,
//       fileId: req.file.id,
//     });
//     // console.log("````song`````")
//     console.log(newSong)
//     newSong
//       .save()
//       .then((song) => {
//         res.status(200).json({
//           message: 'File uploaded successfuly.',
//           song,
//         });
//       })
//       .catch((err) => res.status(500).json(err));
//   })
//   .catch((err) => res.status(500).json(err));
// });
// const url = SONGS_MONGO_URI;
//Delete a particular file using its ObjectId
// export const deleteSong =((req, res, next) => {
//     gridFS.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//       if (err) {
//         return res.status(404).json({ err: err });
//       }
//       res.status(200).json({
//         success: true,
//         message: `File successfully deleted`,
//       });
//     });
//   });
