"use strict";
exports.__esModule = true;
var express_1 = require("express");
var songRouter = express_1["default"].Router();
var songCont_1 = require("./songCont");
var songMiddleWare_1 = require("./songMiddleWare");
songRouter.get('/', songCont_1.index)
    .post('/show', songCont_1.show)
    .post('/store', songMiddleWare_1.upload.single('avatar'), songCont_1.store)
    .patch('/update', songCont_1.update)["delete"]('/delete', songCont_1.destroy);
exports["default"] = songRouter;
