import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { GridFsStorage } from 'multer-gridfs-storage';

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const cors = require('cors');



import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(express.static("Public"));
app.use(express.json());
app.use(cors());

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI)
  .then(() => console.info("MongoDB connected"))
  .catch(err => console.error(err));

const { SONGS_MONGO_URI } = process.env;
const conn = mongoose.createConnection(SONGS_MONGO_URI);

conn.on('connected', () => {
  console.log("songs file system (gridFS) connected successfully");
});

const storage = new GridFsStorage({
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
            // Add more parameters as needed
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

app.get("/get-songs", async (req, res) => {
  const filesCollection = conn.db.collection('uploads.files');
  try {
    const songs = await filesCollection.find({}).toArray();
    if (!songs.length) {
      return res.status(404).json({ error: 'No songs found' });
    }
    return res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/files", async (req, res) => {
  try {
      const filesCollection = conn.db.collection('uploads.files');
      const files = await filesCollection.find({}).toArray();
      
      if (!files || files.length === 0) {
          return res.status(404).json({
              error: "No files exist"
          });
      }
      
      return res.json(files);
  } catch (err) {
      console.error("Error retrieving files:", err);
      return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/play-song", async (req, res) => {
  const filename = req.query.filename;

  // First, get the file metadata
  const filesCollection = conn.db.collection('uploads.files');
  const file = await filesCollection.findOne({ filename });

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
    } else {
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

});

app.get("/get-artist-songs", async (req, res) => {
  const filesCollection = conn.db.collection('uploads.files');
  try {
    const artist = req.query.artist;
    const query = {
      "metadata.artist": artist
    };
    const songs = await filesCollection.find(query).toArray();
    if (!songs.length) {
      return res.status(404).json({ error: 'No songs found' });
    }
    return res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



import userRouter from './API/users/userRouter';
app.use('/API/users', userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
