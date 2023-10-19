"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userSongsCont_1 = require("./userSongsCont");
var userSongsRouter = express_1["default"].Router();
userSongsRouter
    .post("/likedSongs", userSongsCont_1.likedSongs)
    .get("/likedCheck", userSongsCont_1.likedCheck)
    .post("/DeletelikedSongs", userSongsCont_1.DeletelikedSongs)
    .get("/get-Liked-songs", userSongsCont_1.getLikedsongs);
exports["default"] = userSongsRouter;
