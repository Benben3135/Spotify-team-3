"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userCont_1 = require("./userCont");
var router = express_1["default"].Router();
router.post("/login", userCont_1.login)
    .post("/register", userCont_1.register)
    .post("/sendEmail", userCont_1.sendEmail);
exports["default"] = router;
