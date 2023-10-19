"use strict";
exports.__esModule = true;
exports.LikedSongsDB = exports.LikedSongsSchema = exports.userLikedSongs = exports.SongClass = exports.UserClass = void 0;
var mongoose_1 = require("mongoose");
var UserClass = /** @class */ (function () {
    function UserClass(name, email, password, admin, createdAt, artistName) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.createdAt = createdAt;
        this.artistName = artistName;
    }
    return UserClass;
}());
exports.UserClass = UserClass;
var SongClass = /** @class */ (function () {
    function SongClass(name, artist, genre, fileName) {
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.fileName = fileName;
    }
    return SongClass;
}());
exports.SongClass = SongClass;
var userLikedSongs = /** @class */ (function () {
    function userLikedSongs(email, fileName) {
        this.email = email;
        this.fileName = fileName;
    }
    return userLikedSongs;
}());
exports.userLikedSongs = userLikedSongs;
//join collection DB
exports.LikedSongsSchema = new mongoose_1.Schema({
    email: String,
    fileName: String
});
exports["default"] = exports.LikedSongsSchema;
exports.LikedSongsDB = mongoose_1.model("likedSongs", exports.LikedSongsSchema);
