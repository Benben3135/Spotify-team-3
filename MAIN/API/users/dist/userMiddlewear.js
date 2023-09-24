"use strict";
exports.__esModule = true;
exports.isArtist = exports.isAdmin = void 0;
var SECRET = process.env.SECRET;
var secret = SECRET;
var jwt = require('jwt-simple');
//chack if the user is admin
function isAdmin(req, res, next) {
    try {
        //take from cookie and decode cookie and check for admin role
        var token = req.cookies.user;
        if (!token)
            throw new Error("no token");
        var cookie = jwt.decode(token, secret);
        //decoded cookie
        var admin = cookie.admin;
        req.admin = admin;
        if (admin !== true)
            throw new Error("no admin");
        next();
    }
    catch (error) {
        res.status(401).send({ error: error.message });
    }
}
exports.isAdmin = isAdmin;
//chack if the user is artist
function isArtist(req, res, next) {
    try {
        //take from cookie and decode cookie and check for artist role
        var token = req.cookies.user;
        if (!token)
            throw new Error("no token");
        var cookie = jwt.decode(token, secret);
        //decoded cookie
        var artist = cookie.artist;
        req.artist = artist;
        if (artist !== true)
            throw new Error("no artist");
        next();
    }
    catch (error) {
        res.status(401).send({ error: error.message });
    }
}
exports.isArtist = isArtist;
