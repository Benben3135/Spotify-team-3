"use strict";
exports.__esModule = true;
exports.Song = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var SongSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: String
    },
    avatar: {
        type: String
    }
}, { timestamps: true });
exports.Song = mongoose_1["default"].model('Song', SongSchema);
