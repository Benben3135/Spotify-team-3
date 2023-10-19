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
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const cors = require('cors');
require("dotenv/config");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookie_parser_1.default());
app.use(express_1.default.static("Public"));
app.use(express_1.default.json());
app.use(cors());
const { MONGO_URI } = process.env;
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.info("MongoDB connected"))
    .catch(err => console.error(err));
const { SONGS_MONGO_URI } = process.env;
const conn = mongoose_1.default.createConnection(SONGS_MONGO_URI);
conn.on('connected', () => {
    console.log("songs file system (gridFS) connected successfully");
});
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: SONGS_MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
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
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
app.post("/upload", upload.single('file'), (req, res) => {
    res.json({ success: true, message: 'File uploaded successfully' });
});
app.get("/get-songs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filesCollection = conn.db.collection('uploads.files');
    try {
        const songs = yield filesCollection.find({}).toArray();
        if (!songs.length) {
            return res.status(404).json({ error: 'No songs found' });
        }
        return res.json(songs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/files", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filesCollection = conn.db.collection('uploads.files');
        const files = yield filesCollection.find({}).toArray();
        if (!files || files.length === 0) {
            return res.status(404).json({
                error: "No files exist"
            });
        }
        return res.json(files);
    }
    catch (err) {
        console.error("Error retrieving files:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/play-song", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    // First, get the file metadata
    const filesCollection = conn.db.collection('uploads.files');
    const file = yield filesCollection.findOne({ filename });
    if (!file) {
        return res.status(404).json({ error: "No file found" });
    }
    // Then, stream the actual file chunks
    const chunksCollection = conn.db.collection('uploads.chunks');
    const downloadStream = chunksCollection.find({ files_id: file._id }).sort({ n: 1 }).stream();
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    downloadStream.on('data', (chunk) => {
        if (chunk.data) {
            res.write(chunk.data.buffer);
        }
        else {
            console.error('Unexpected chunk content:', JSON.stringify(chunk, null, 2));
        }
    });
    downloadStream.on('error', (err) => {
        console.error('Error streaming file:', err);
        res.sendStatus(500);
    });
    downloadStream.on('end', () => {
        res.end();
    });
}));
app.get("/get-artist-songs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filesCollection = conn.db.collection('uploads.files');
    try {
        const artist = req.query.artist;
        const query = {
            "metadata.artist": artist
        };
        const songs = yield filesCollection.find(query).toArray();
        if (!songs.length) {
            return res.status(404).json({ error: 'No songs found' });
        }
        return res.json(songs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/get-song", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filesCollection = conn.db.collection('uploads.files');
    try {
        const artist = req.query.artist;
        const name = req.query.name;
        console.log(artist, name);
        const query = {
            "metadata.artist": artist,
            "metadata.name": name
        };
        const songs = yield filesCollection.find(query).toArray();
        if (!songs.length) {
            return res.status(404).json({ error: 'No songs found' });
        }
        return res.json(songs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// app.get("/get-song_forLiked", async (req, res) => {
//   const filesCollection = conn.db.collection('uploads.files');
//   try {
//     const artist = req.query.artist;
//     const name = req.query.name;
//     console.log(artist,name)
//     const query = {
//       "metadata.artist": artist,
//       "metadata.name": name
//     };
//     const song = await filesCollection.findOne(query);
//     return res.json(song);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
app.get("/get-song-by-filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filesCollection = conn.db.collection('uploads.files');
    try {
        const { filename } = req.query;
        console.log("i got this filename:", filename);
        // Validate filename
        if (!filename || typeof filename !== 'string') {
            return res.status(400).json({ error: "Valid filename is required" });
        }
        const query = {
            "filename": filename
        };
        const song = yield filesCollection.findOne(query);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }
        res.json(song);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/get-topGenre", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filesCollection = conn.db.collection('uploads.files');
    try {
        const { topGenre } = req.query;
        const query = {
            "metadata.genre": topGenre
        };
        const songs = yield filesCollection.find(query).toArray();
        if (!songs.length) {
            return res.status(404).json({ error: 'No songs found' });
        }
        return res.json(songs);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use('/API/users', userRouter_1.default);
const userSongsRouter_1 = __importDefault(require("./API/user_songs/userSongsRouter"));
app.use('/API/user_songs', userSongsRouter_1.default);
const algorithmsRouter_1 = __importDefault(require("./API/songsAlgorithms/algorithmsRouter"));
app.use('/API/songsAlgorithms', algorithmsRouter_1.default);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
