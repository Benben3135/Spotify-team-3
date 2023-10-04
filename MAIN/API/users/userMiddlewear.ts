const {SECRET} = process.env;
const secret = SECRET;

const jwt = require('jwt-simple');

export function isAdmin(req, res, next) {
    try {
        console.log("i started checking if admin")

        //take from cookie and decode cookie and check for admin role
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        //decoded cookie
        const {admin} = cookie;
        const {artistName} = cookie;
        req.admin = admin;
        req.artistName = artistName;
        if(admin !== true){
            res.send(Error);
        };
        console.log("you are an admin!")

        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}