"use strict";
exports.__esModule = true;
exports.UserModelDB = exports.UserSchema = void 0;
//define a scheme
var mongoose_1 = require("mongoose");
// DB models
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        immutable: true,
        "default": function () { return Date.now(); }
    }
});
exports.UserModelDB = mongoose_1.model("users", exports.UserSchema);
