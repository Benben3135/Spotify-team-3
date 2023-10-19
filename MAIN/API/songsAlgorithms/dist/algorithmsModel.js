"use strict";
exports.__esModule = true;
exports.genreCounerModelDB = exports.genreCounterSchema = void 0;
var mongoose_1 = require("mongoose");
exports.genreCounterSchema = new mongoose_1.Schema({
    email: String,
    rock: Number,
    pop: Number,
    rap: Number,
    metal: Number,
    classic: Number,
    ambient: Number,
    worldMusic: Number,
    HipHop: Number,
    soul: Number,
    jazz: Number,
    dance: Number,
    techno: Number,
    electronic: Number
});
exports["default"] = exports.genreCounterSchema;
exports.genreCounerModelDB = mongoose_1.model("genrecounter", exports.genreCounterSchema);
