"use strict";
exports.__esModule = true;
exports.SongModel = void 0;
var mongoose_1 = require("mongoose");
var SongSchema = new mongoose_1.Schema({
    filename: {
        required: true,
        type: String
    },
    file: {
        required: true,
        type: Buffer
    },
    title: String,
    genre: String,
    createAt: {
        "default": Date.now(),
        type: Date
    }
});
exports.SongModel = mongoose_1.model('Song', SongSchema);
