"use strict";
exports.__esModule = true;
var express_1 = require("express");
var algorithmsCont_1 = require("./algorithmsCont");
var algorithmsRouter = express_1["default"].Router();
algorithmsRouter
    .post("/addGenereLiked", algorithmsCont_1.addGenereLiked)
    .get("/getGeneres", algorithmsCont_1.getGeneres)
    .post("/addStamina", algorithmsCont_1.addStamina)
    .get("/getStaminas", algorithmsCont_1.getStaminas);
exports["default"] = algorithmsRouter;
