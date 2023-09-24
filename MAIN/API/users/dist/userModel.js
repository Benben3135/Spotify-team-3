"use strict";
exports.__esModule = true;
exports.UserModelDB = exports.UserSchema = exports.User = void 0;
//define a scheme
var mongoose_1 = require("mongoose");
var User = /** @class */ (function () {
    function User(name, email, password, admin, artist, createdAt) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.artist = artist;
        this.createdAt = createdAt;
    }
    return User;
}());
exports.User = User;
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    admin: {
        type: Boolean,
        "default": false
    },
    artist: {
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
