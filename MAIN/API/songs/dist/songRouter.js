"use strict";
// import express from 'express'
// import { index, show, store, update, destroy} from './songCont'
// const songRouter = express.Router()
exports.__esModule = true;
// songRouter.get('/',index)
// .post('/show',show )
// .post('/store', store)
// .patch('/update',update)
// .delete('/delete', destroy)
// export default songRouter;
var express_1 = require("express");
var songCont_1 = require("./songCont");
var router = express_1["default"].Router();
router.get('/get-song', songCont_1.getSong)
    .post('/add-song', songCont_1.addSong)["delete"]('/delete-song', songCont_1.deleteSong)
    .patch('/update-song-name', songCont_1.updateSongName);
// .get ('/get-user-items',getUserItems)
// router .get('/get-items/:id', getItem)
// .post('/add-item', addItem)
// .delete('/delete-item', deleteItem)
// .patch('/update-item-price', updateItem)
// .get ('/get-items',getUserItems)
exports["default"] = router;
