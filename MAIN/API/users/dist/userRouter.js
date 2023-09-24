"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userCont_1 = require("./userCont");
var userRouter = express_1["default"].Router();
userRouter.post("/login", userCont_1.login)
    .post("/register", userCont_1.register)
    .get("/get-User", userCont_1.getUser);
exports["default"] = userRouter;
