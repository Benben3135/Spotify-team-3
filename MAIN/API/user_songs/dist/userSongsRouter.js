"use strict";
exports.__esModule = true;
var express_1 = require("express");
//import { isAdmin } from './userMiddlewear';
var userSongsCont_1 = require("./userSongsCont");
var userSongRouter = express_1["default"].Router();
userSongRouter
    .get("/get-user-songs-list", userSongsCont_1.getUserSongsList);
exports["default"] = userSongRouter;
