"use strict";
exports.__esModule = true;
exports.Song = exports.SongSchema = void 0;
var mongoose_1 = require("mongoose");
exports.SongSchema = new mongoose_1.Schema({
    caption: {
        required: true,
        type: String
    },
    filename: {
        required: true,
        type: String
    },
    fileId: {
        required: true,
        type: String
    },
    createAt: {
        "default": Date.now(),
        type: Date
    }
});
exports.Song = mongoose_1.model('Song', exports.SongSchema);
