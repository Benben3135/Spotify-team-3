"use strict";
exports.__esModule = true;
exports.artistSongs = exports.ArtistSongs = exports.userSongs = exports.UserSongs = void 0;
var UserSongs = /** @class */ (function () {
    function UserSongs(user, song) {
        this.user = user;
        this.song = song;
    }
    return UserSongs;
}());
exports.UserSongs = UserSongs;
exports.userSongs = [];
var ArtistSongs = /** @class */ (function () {
    function ArtistSongs(artist, song) {
        this.artist = artist;
        this.song = song;
    }
    return ArtistSongs;
}());
exports.ArtistSongs = ArtistSongs;
exports.artistSongs = [];
