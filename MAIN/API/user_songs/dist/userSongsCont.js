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
exports.getLikedsongs = exports.DeletelikedSongs = exports.likedCheck = exports.likedSongs = void 0;
var userSongsModel_1 = require("./userSongsModel");
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var SECRET = process.env.SECRET;
var secret = SECRET;
var saltRounds = 10;
var axios = require('axios');
exports.likedSongs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, artist, name, url;
    return __generator(this, function (_a) {
        try {
            data = req.body;
            artist = data.artist;
            name = data.name;
            url = "http://localhost:3000/get-song?artist=" + artist + "&name=" + name;
            axios.get(url)
                .then(function (response) {
                // Handle the response here
                var data = response.data[0];
                var fileName = data.filename;
                joinCollectionLikedSong(fileName, req, res);
            })["catch"](function (error) {
                // Handle any errors
                console.error(error);
            });
        }
        catch (error) {
            console.error(error);
            res.send({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
function getEmailFromCoockie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, cookie, email;
        return __generator(this, function (_a) {
            try {
                token = req.cookies.user;
                if (!token)
                    throw new Error("no token");
                cookie = jwt.decode(token, secret);
                email = cookie.email;
                return [2 /*return*/, email];
            }
            catch (error) {
                res.status(401).send({ error: error.message });
            }
            return [2 /*return*/];
        });
    });
}
function joinCollectionLikedSong(song, req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getEmailFromCoockie(req, res)];
                case 1:
                    email = _a.sent();
                    createJoinCollection(song, email);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(401).send({ error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createJoinCollection(fileName, email) {
    return __awaiter(this, void 0, void 0, function () {
        var likedSong, savedSong, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    likedSong = new userSongsModel_1.LikedSongsDB({ email: email, fileName: fileName });
                    return [4 /*yield*/, likedSong.save()];
                case 1:
                    savedSong = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.likedCheck = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, token, cookie, email, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filename = req.query.filename;
                token = req.cookies.user;
                if (!token)
                    throw new Error("no token");
                cookie = jwt.decode(token, secret);
                email = cookie.email;
                return [4 /*yield*/, userSongsModel_1.LikedSongsDB.findOne({ email: email, fileName: filename })];
            case 1:
                response = _a.sent();
                if (response) {
                    res.send(true);
                }
                else {
                    res.send(false);
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.send({ error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeletelikedSongs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, token, cookie, email, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filename = req.body.filename;
                token = req.cookies.user;
                if (!token)
                    throw new Error("no token");
                cookie = jwt.decode(token, secret);
                email = cookie.email;
                return [4 /*yield*/, userSongsModel_1.LikedSongsDB.deleteOne({ email: email, fileName: filename })];
            case 1:
                _a.sent();
                // Send structured response
                res.json({ success: true });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.send({ error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLikedsongs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, cookie, email, likedSongs_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = req.cookies.user;
                if (!token)
                    throw new Error("no token");
                cookie = jwt.decode(token, secret);
                email = cookie.email;
                return [4 /*yield*/, userSongsModel_1.LikedSongsDB.find({ email: email })];
            case 1:
                likedSongs_1 = _a.sent();
                res.json(likedSongs_1);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.send({ error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
