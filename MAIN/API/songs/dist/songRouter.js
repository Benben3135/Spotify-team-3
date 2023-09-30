"use strict";
exports.__esModule = true;
var express_1 = require("express");
var songCont_1 = require("./songCont");
var router = express_1["default"].Router();
router
    .get('/get-file', songCont_1.getSong)
    .post('/upload-file', songCont_1.uploadSong);
exports["default"] = router;
// import { uploadSong,deleteSong } from './songCont'
// .delete('/delete-file/:id',deleteSong)
