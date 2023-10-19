"use strict";
exports.__esModule = true;
exports.Song = exports.SongSchema = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
exports.SongSchema = new Schema({
    name: {
        type: String
    },
    artist: {
        type: String,
        unique: true
    },
    genre: String
});
exports.Song = mongoose_1["default"].model('Song', exports.SongSchema);
