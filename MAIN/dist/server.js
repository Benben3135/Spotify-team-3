"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
//streaming library for node.js
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
//npm i dotenv
require("dotenv/config");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(methodOverride('_method'));
//middlware for using parser
app.use(cookie_parser_1.default());
//static files
app.use(express_1.default.static("Public"));
//body
app.use(express_1.default.json());
const { MONGO_URI } = process.env;
//connect to mongoDB with mongoose
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.info("MongoDB connected");
})
    .catch(err => {
    console.error(err);
});
const { SECRET } = process.env;
const secret = SECRET;
const jwt = require('jwt-simple');
function getArtistName(req, res) {
    try {
        //take from cookie and decode cookie and check for admin role
        const token = req.cookies.user;
        if (!token)
            throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        //decoded cookie
        const { artistName } = cookie;
        req.artistName = artistName;
    }
    catch (error) {
        res.status(401).send({ error: error.message });
    }
}
//setting the songs DB:
const { SONGS_MONGO_URI } = process.env;
const conn = mongoose_1.default.createConnection(SONGS_MONGO_URI);
let gfs;
conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db, mongoose_1.default.mongo);
    gfs.collection('uploads');
});
//check if DB connected
conn.on('connected', () => {
    console.log("songs file system (gridFS) connected successfully");
});
conn.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
});
//create storage engine
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: SONGS_MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    metadata: {
                        name: req.body.name,
                        artist: req.query.artist,
                        genre: req.body.genre,
                        img: req.body.img,
                    },
                    bucketName: "uploads",
                };
                console.log("new file created");
                resolve(fileInfo);
            });
        });
    },
});
//gfs.createWriteStream(file.filename, fileInfo.name)
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const fileInfo = req.file; // The fileInfo is available in req.file
    console.log(fileInfo);
    res.redirect("/Main/main.html"); //אולי עדיף להישאר בדף העלאה ולצאת משם באמצעות לחצן?
});
app.get("/get-songs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield gfs.files.find().toArray();
        res.json(songs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
//ouer:
app.get("/play", (req, res) => {
    //const filename = req.params;
    console.log('you in app.get');
    gfs.files.find({}, (err, file) => {
        if (err || !file) {
            return res.status(404).json({
                err: "File not found",
            });
        }
        // Check if the file is an MP3
        if (file.contentType !== "audio/mpeg" && file.contentType !== "audio/mp3") {
            return res.status(400).json({
                err: "Not an MP3 file",
            });
        }
        // Stream the file to the client
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});
//fron chatGTP:
// app.get('/play', (req, res) => {
//   console.log('you in app.get')
//   gfs.files.find({}).toArray((err, files) => {
//     if (err || !files || files.length === 0) {
//       return res.status(404).sendFile(path.join(__dirname, 'error.html'));
//     }
//     const file = files[0];
//     if (file.contentType !== 'audio/mpeg' && file.contentType !== 'audio/mp3') {
//       return res.status(400).sendFile(path.join(__dirname, 'error.html'));
//     }
//     res.sendFile(path.join(__dirname, 'play.html'));
//   });
// });
// app.get('/play', (req, res) => {
//   console.log('you in app.get')
//   try {
//     gfs.files.find({}).toArray((err, files) => {
//       if (err || !files || files.length === 0) {
//         return res.status(404).send('<html><body><h1>Error: Files not found</h1></body></html>');
//       }
//       const file = files[0];
//       if (file.contentType !== 'audio/mpeg' && file.contentType !== 'audio/mp3') {
//         return res.status(400).send('<html><body><h1>Error: Not an MP3 file</h1></body></html>');
//       }
//       const htmlResponse = `<html><body><h1>Now Playing: ${file.filename}</h1></body></html>`;
//       res.send(htmlResponse);
//     });
//   } catch (error) {
//     console.error(error)
//   }
// });
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
