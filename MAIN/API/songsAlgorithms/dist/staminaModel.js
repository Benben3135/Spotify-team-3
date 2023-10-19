"use strict";
exports.__esModule = true;
exports.ArtistStaminaModelDB = exports.artistStaminaSchema = void 0;
var mongoose_1 = require("mongoose");
//artist stamina model:
exports.artistStaminaSchema = new mongoose_1.Schema({
    email: String,
    artistName: String,
    stamina: {
        type: Number,
        "default": 0
    }
});
exports["default"] = exports.artistStaminaSchema;
exports.ArtistStaminaModelDB = mongoose_1.model("artistStamina", exports.artistStaminaSchema);
