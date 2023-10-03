import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { GridFsStorage } from 'multer-gridfs-storage';


//streaming library for node.js
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')



//npm i dotenv
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(methodOverride('_method'))


//middlware for using parser
app.use(cookieParser())


//static files
app.use(express.static("Public"));

//body
app.use(express.json());


const { MONGO_URI } = process.env;
//connect to mongoDB with mongoose
mongoose.connect(MONGO_URI).then(() => {
  console.info("MongoDB connected")
})

  .catch(err => {
    console.error(err)
  })

//setting the songs DB:

const { SONGS_MONGO_URI } = process.env;
const conn = mongoose.createConnection(SONGS_MONGO_URI);

let gfs;
conn.once('open', () => {
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
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
const storage = new GridFsStorage({
  url: SONGS_MONGO_URI,
  file: (req: any, file: any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err: any, buf: any) => {
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
            // Add more parameters as needed
          }, 
          bucketName: "uploads",
        };
        console.log("new file created")
        resolve(fileInfo);
      });
    });
  },
});

//gfs.createWriteStream(file.filename, fileInfo.name)

const upload = multer({ storage });


app.post("/upload", upload.single("file"), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
      const fileInfo = req.file; // The fileInfo is available in req.file
      console.log(fileInfo);
  res.redirect("/Main/main.html") //אולי עדיף להישאר בדף העלאה ולצאת משם באמצעות לחצן?
});


app.get("/play/userName", (req, res) => {
  const filename = req.params;
  console.log('you in app.get')
  gfs.files.find({ }, (err, file) => {
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









import userRouter from "./API/users/userRouter";
app.use("/API/users", userRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
