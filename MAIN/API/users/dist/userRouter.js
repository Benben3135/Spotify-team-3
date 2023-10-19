"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userCont_1 = require("./userCont");
var userMiddlewear_1 = require("./userMiddlewear");
var userRouter = express_1["default"].Router();
userRouter.post("/login", userCont_1.login)
    .post("/register", userCont_1.register)
    .get("/get-User", userCont_1.getUser)
    .get("/addArtistFunc", userMiddlewear_1.isAdmin, userCont_1.addArtistFunc)
    .get("/get-artist-data", userCont_1.getArtistData);
exports["default"] = userRouter;
