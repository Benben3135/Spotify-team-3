"use strict";
exports.__esModule = true;
exports.Song = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var SongSchema = new Schema({
    name: {
        type: String
    },
    artist: {
        type: String,
        unique: true
    },
    genre: String
});
exports.Song = mongoose_1["default"].model('Song', SongSchema);
