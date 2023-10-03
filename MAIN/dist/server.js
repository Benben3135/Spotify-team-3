"use strict";
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
                    artist: req.body.artist,
                    metadata: {
                        name: req.body.name,
                        artist: req.body.artist,
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
app.get("/play/userName", (req, res) => {
    const filename = req.params;
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
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
