"use strict";
exports.__esModule = true;
exports.UserModelDB = exports.UserSchema = void 0;
//define a scheme
var mongoose_1 = require("mongoose");
// DB models
//model for user, conatains its:
//  name (for DOM manipulations like greeting)
// email (for authintication and as identifier)
// password (for authintication)
//admin Boolean propertie, to check if the user can add new song and etc.
//created at- a propertie automatically creates in the DB to know when the user has been created. will be used in info section.
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    admin: {
        type: Boolean,
        "default": false
    },
    createdAt: {
        type: Date,
        immutable: true,
        "default": function () { return Date.now(); }
    }
});
exports["default"] = exports.UserSchema;
exports.UserModelDB = mongoose_1.model("users", exports.UserSchema);
