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
exports.uploadSong = void 0;
var songModel_1 = require("./songModel");
var mongoose_1 = require("mongoose");
var multer = require('multer');
var methodOverride = require('method-override');
var crypto = require('crypto');
var path = require('path');
// const GridFsStorage = require('multer-gridfs-storage');
var GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const config = require('./config'); // Contains env. and other configs
// connect to mongoDB with mongoose
var SONGS_MONGO_URI = process.env.SONGS_MONGO_URI;
// mongoose.connect(SONGS_MONGO_URI).then(()=>{
//     console.info("MongoSongDB connected")
//   })
//   .catch(err=>{
//       console.error(err)
//     }) 
//upload a file
// const {SONGS_MONGO_URI} = process.env;
var storage = new GridFsStorage({
    url: SONGS_MONGO_URI,
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
                console.log("new file created");
                resolve(fileInfo);
            });
        });
    }
});
var upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });
exports.uploadSong = (upload.single("file"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, file, song, songDB;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.file); //after it will return the value of file
                console.log(req.body);
                _a = req.body, filename = _a.filename, file = _a.file;
                console.log({ filename: filename, file: file });
                if (!filename || !file)
                    throw new Error("please fill all fileds");
                song = new songModel_1.Song({ filename: filename, file: file });
                console.log(song);
                return [4 /*yield*/, song.save()
                        .then(function (songDB) {
                        res.status(200).json({
                            message: 'File uploaded successfuly.',
                            songDB: songDB
                        });
                    })["catch"](function (err) { return res.status(500).json(err); })];
            case 1:
                songDB = _b.sent();
                return [2 /*return*/];
        }
    });
}); });
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
var connect = mongoose_1["default"].createConnection(SONGS_MONGO_URI);
var gridFS;
connect.once('open', function () {
    // initialize stream
    gridFS = new mongoose_1["default"].mongo.GridFSBucket(connect.db, {
        bucketName: "songUploads"
    });
});
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
