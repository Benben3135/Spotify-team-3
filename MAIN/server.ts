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


//npm i dotenv
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());



//middlware for using parser
app.use(cookieParser())


//static files
app.use(express.static("Public"));

//body
app.use(express.json());


const {MONGO_URI} = process.env;
//connect to mongoDB with mongoose
mongoose.connect(MONGO_URI).then(()=>{
  console.info("MongoDB connected")
})

.catch(err=>{
  console.error(err)
})

//setting the songs DB:
const {SONGS_MONGO_URI} = process.env;
const conn = mongoose.createConnection(SONGS_MONGO_URI);
let gfs;
conn.once('open', () => {
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
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

app.post("/upload", upload.single("file"), (req: any, res: any) => {
  res.redirect("/")
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







import userRouter from "./API/users/userRouter";
app.use("/API/users", userRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
