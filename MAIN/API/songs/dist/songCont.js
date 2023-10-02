"use strict";
exports.__esModule = true;
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
var songModel_1 = require("./songModel");
exports.index = function (req, res, next) {
    songModel_1.Song.find()
        .then(function (response) {
        res.json({
            response: response
        });
    })["catch"](function (error) {
        res.json({
            message: "An error Occured!"
        });
    });
};
//show single song
exports.show = function (req, res, next) {
    var songID = req.body.songID;
    songModel_1.Song.findById(songID)
        .then(function (response) {
        res.json({
            response: response
        });
    })["catch"](function (error) {
        res.json({
            message: 'An error Occured!'
        });
    });
};
//Add a song
exports.store = function (req, res, next) {
    var song = new songModel_1.Song({
        title: req.body.title,
        genre: req.body.genre
    });
    if (req.file) {
        song.avatar = req.file.path;
    }
    song.save()
        .then(function (response) {
        res.json({
            message: 'Song Added Successfully!'
        });
    })["catch"](function (error) {
        console.error(error);
        res.json({
            message: 'An error Occured!'
        });
    });
};
//update a song
exports.update = function (req, res, next) {
    var songID = req.body.songID;
    var updatedData = {
        title: req.body.title,
        genre: req.body.genre
    };
    songModel_1.Song.findByIdAndUpdate(songID, { $set: updatedData })
        .then(function () {
        res.json({
            message: 'Song updated successfully!'
        });
    })["catch"](function (error) {
        res.json({
            message: 'An error Occured!'
        });
    });
};
//delete a song
exports.destroy = function (req, res, next) {
    var songID = req.body.songID;
    songModel_1.Song.findOneAndRemove(songID)
        .then(function () {
        res.json({
            message: 'Song deleted successfully!'
        });
    })["catch"](function (error) {
        res.json({
            message: 'An error Occured!'
        });
    });
};
