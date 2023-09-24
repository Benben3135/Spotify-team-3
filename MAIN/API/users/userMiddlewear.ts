const {SECRET} = process.env;
const secret = SECRET;

const jwt = require('jwt-simple');


//chack if the user is admin
export function isAdmin(req: any, res: any, next: Function) {
    try {

        //take from cookie and decode cookie and check for admin role
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        //decoded cookie
        const {admin} = cookie;
        req.admin = admin;
        if(admin !== true) throw new Error("no admin");
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

//chack if the user is artist
export function isArtist(req: any, res: any, next: Function) {
    try {

        //take from cookie and decode cookie and check for artist role
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        //decoded cookie
        const {artist} = cookie;
        req.artist = artist;
        if(artist !== true) throw new Error("no artist");
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}