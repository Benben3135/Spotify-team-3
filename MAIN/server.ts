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

  const {SECRET} = process.env;
  const secret = SECRET;
  const jwt = require('jwt-simple');
  
  function getArtistName(req, res) {
    try {
        //take from cookie and decode cookie and check for admin role
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        //decoded cookie
        const {artistName} = cookie;
        req.artistName =  artistName;
      
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}
  
 
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
          metadata: {
            name: req.body.name,
            artist: req.query.artist,
            genre: req.body.genre,
            img: req.body.img,
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

app.get("/get-songs", async (req, res) => {
  try {
    const songs = await gfs.files.find().toArray();
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//ouer:
app.get("/play", (req, res) => {
  //const filename = req.params;
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










import userRouter from "./API/users/userRouter";
app.use("/API/users", userRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
