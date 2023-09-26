"use strict";
exports.__esModule = true;
var express_1 = require("express");
var songCont_1 = require("./songCont");
var router = express_1["default"].Router();
router
    .patch('/upload-file', songCont_1.uploadSong)["delete"]('/delete-file/:id', songCont_1.deleteSong);
exports["default"] = router;
