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
exports.addStamina = exports.getGeneres = exports.addGenereLiked = void 0;
var algorithmsModel_1 = require("./algorithmsModel");
var staminaModel_1 = require("./staminaModel");
var axios = require('axios');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var SECRET = process.env.SECRET;
var secret = SECRET;
var saltRounds = 10;
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
exports.addGenereLiked = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, url, response, data, songMeta, genreFromResponse, genreCounts, email, initialCounts, genre, newGenreCounts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 12, , 13]);
                filename = req.body.filename;
                url = "http://localhost:3000/get-song-by-filename?filename=" + filename;
                return [4 /*yield*/, axios.get(url)];
            case 1:
                response = _a.sent();
                if (!response.data) return [3 /*break*/, 10];
                data = response.data;
                songMeta = data.metadata;
                genreFromResponse = songMeta.genre;
                if (!Object.hasOwnProperty.call(algorithmsModel_1.genreCounterSchema.obj, genreFromResponse)) return [3 /*break*/, 8];
                return [4 /*yield*/, algorithmsModel_1.genreCounerModelDB.findOne()];
            case 2:
                genreCounts = _a.sent();
                if (!genreCounts) return [3 /*break*/, 4];
                // Increment the count for the genre
                genreCounts[genreFromResponse] += 1;
                return [4 /*yield*/, genreCounts.save()];
            case 3:
                _a.sent();
                res.status(200).json({ success: true, message: 'Operation successful' });
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, getEmailFromCoockie(req, res)];
            case 5:
                email = _a.sent();
                initialCounts = { email: email };
                for (genre in algorithmsModel_1.genreCounterSchema.obj) {
                    if (genre !== "email") {
                        initialCounts[genre] = genre === genreFromResponse ? 1 : 0;
                    }
                }
                newGenreCounts = new algorithmsModel_1.genreCounerModelDB(initialCounts);
                return [4 /*yield*/, newGenreCounts.save()];
            case 6:
                _a.sent();
                res.status(200).json({ success: true, message: 'Operation successful' });
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                console.error('Received an unknown genre:', genreFromResponse);
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                console.error('No data received from the server.');
                res.status(500).json({ success: false, error: 'Error message here' });
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _a.sent();
                console.error(error_1);
                // Check if the error has a specific response from Axios
                if (error_1.response) {
                    console.error("Axios error response:", error_1.response);
                    res.send({ error: error_1.response.data });
                }
                else {
                    res.send({ error: error_1.message });
                }
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.getGeneres = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, genres, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getEmailFromCoockie(req, res)];
            case 1:
                email = _a.sent();
                console.log("looking for all the genres");
                return [4 /*yield*/, algorithmsModel_1.genreCounerModelDB.findOne({ email: email })];
            case 2:
                genres = _a.sent();
                res.send(genres);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.send({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//stamina functions:
exports.addStamina = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, filename, url, response, data, songMeta, artist, check, newStaminaDB, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, getEmailFromCoockie(req, res)];
            case 1:
                email = _a.sent();
                filename = req.body.filename;
                url = "http://localhost:3000/get-song-by-filename?filename=" + filename;
                return [4 /*yield*/, axios.get(url)];
            case 2:
                response = _a.sent();
                data = response.data;
                songMeta = data.metadata;
                artist = songMeta.artist;
                console.log(email, artist);
                return [4 /*yield*/, staminaModel_1.ArtistStaminaModelDB.findOne({ email: email, artist: artist })];
            case 3:
                check = _a.sent();
                if (!check) return [3 /*break*/, 4];
                check.stamina += 1;
                check.save();
                return [3 /*break*/, 6];
            case 4:
                newStaminaDB = new staminaModel_1.ArtistStaminaModelDB({ email: email, artist: artist, stamina: 1 });
                return [4 /*yield*/, newStaminaDB.save()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                res.send({ message: "Stamina updated successfully!" });
                return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                console.error(error_3);
                res.send({ error: error_3.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
