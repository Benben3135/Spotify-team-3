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
exports.updateSongName = exports.deleteSong = exports.getUserSongs = exports.addSong = exports.getSong = void 0;
var songModel_1 = require("./songModel");
// export const index = (req, res, next)=> {
//     Song.find()
//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: "An error Occured!"
//         })
//     })
// }
// //show single song
// export const show = (req, res, next) => {
//     let songID = req.body.songID
//     Song.findById(songID)
//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }
// //Add a song
// export const store = (req, res, next) => {
//     let song = new Song({
//         name: req.body.name,
//         artist: req.body.artist
//     })
//     song.save()
//     .then(response => {
//         res.json({
//             message: 'Song Added Successfully!'
//         })
//     })
//     .catch(error => {
//         console.error(error);
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }
// //update a song
// export const update = (req,res,next) => {
//     let songID = req.body.songID
//     let updatedData = {
//         name: req.body.name,
//         artist: req.body.artist
//     }
//     Song.findByIdAndUpdate(songID, {$set: updatedData})
//     .then(()=>{
//         res.json({
//             message: 'Song updated successfully!'
//         })
//     })
//     .catch(error=> {
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }
// //delete a song
// export const destroy = (req,res,next) => {
//     let songID = req.body.songID
//     Song.findOneAndRemove(songID)
//     .then(()=>{
//         res.json({
//             message: 'Song deleted successfully!'
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }
exports.getSong = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songDB, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, songModel_1.Song.find({})];
            case 1:
                songDB = _a.sent();
                res.send({ songs: songDB });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addSong = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, artist, song, songDB, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, artist = _a.artist;
                console.log({ name: name, artist: artist });
                if (!name || !artist)
                    throw new Error("Please fill all fileds");
                song = new songModel_1.Song({ name: name, artist: artist });
                return [4 /*yield*/, song.save()];
            case 1:
                songDB = _b.sent();
                console.log(songDB);
                res.send({ ok: true });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).send({ error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserSongs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, songsDB, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.query.email;
                if (!email) {
                    throw new Error("email is required");
                }
                return [4 /*yield*/, songModel_1.Song.find({ email: email })];
            case 1:
                songsDB = _a.sent();
                res.send({ Song: songsDB });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).send({ error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// export const getItem = async(req:any, res:any)=>{
//     try {
//         const {id} = req.query;
//         const itemDB = await CrossfitItem.findById(id);
//         // res.send({CrossfitItem:itemDB})
//         res.status(200).json(itemDB);
//     } catch (error) {
//         console.error(error)
//     }
// }
// export const getUserItems = async(req:any, res:any)=>{
//     try {
//         const items = await CrossfitItem.find({});
//         res.send(200).json(items)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error.message });
//     }
// }
exports.deleteSong = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, songDB, songs, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                songId = req.body.songId;
                return [4 /*yield*/, songModel_1.Song.findByIdAndDelete(songId)];
            case 1:
                songDB = _a.sent();
                return [4 /*yield*/, songModel_1.Song.find({})];
            case 2:
                songs = _a.sent();
                res.send({ songs: songs });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).send({ error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSongName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, id, songDB, _b, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, name = _a.name, id = _a.id;
                return [4 /*yield*/, songModel_1.Song.findById(id)];
            case 1:
                songDB = _c.sent();
                if (!songDB)
                    throw new Error("Song not found");
                _b = songDB;
                return [4 /*yield*/, songModel_1.Song.findByIdAndUpdate(id, { name: name })];
            case 2:
                _b.name = _c.sent();
                res.send({ Song: songModel_1.Song });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                console.error(error_5);
                res.send({ error: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
