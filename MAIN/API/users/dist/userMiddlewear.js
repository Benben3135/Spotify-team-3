"use strict";
exports.__esModule = true;
exports.isAdmin = void 0;
var SECRET = process.env.SECRET;
var secret = SECRET;
var jwt = require('jwt-simple');
function isAdmin(req, res, next) {
    try {
        console.log("i started checking if admin");
        //take from cookie and decode cookie and check for admin role
        var token = req.cookies.user;
        if (!token)
            throw new Error("no token");
        var cookie = jwt.decode(token, secret);
        //decoded cookie
        var admin = cookie.admin;
        var artistName = cookie.artistName;
        req.admin = admin;
        req.artistName = artistName;
        if (admin !== true) {
            res.send(Error);
        }
        ;
        console.log("you are an admin!");
        next();
    }
    catch (error) {
        res.status(401).send({ error: error.message });
    }
}
exports.isAdmin = isAdmin;
