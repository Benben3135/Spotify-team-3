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
//npm i dotenv
require("dotenv/config");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
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
//create storage engine
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: SONGS_MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
    res.redirect("/");
});
app.get("/play/:filename", (req, res) => {
    const filename = req.params.filename;
    gfs.files.findOne({ filename }, (err, file) => {
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
//to get the audio:
// <audio controls>
//   <source src="/play/your_mp3_filename.mp3" type="audio/mpeg">
//   Your browser does not support the audio element.
// </audio>
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
