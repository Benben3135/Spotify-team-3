import { SongSchema,Song } from './songModel'
import mongoose from 'mongoose';
const multer = require('multer');
const methodOverride = require('method-override');
const crypto = require('crypto');
const path = require('path');
// const GridFsStorage = require('multer-gridfs-storage');
const {GridFsStorage} = require('multer-gridfs-storage');

// const config = require('./config'); // Contains env. and other configs

// connect to mongoDB with mongoose
const {MONGO_URI} = process.env;
// mongoose.connect(SONGS_MONGO_URI).then(()=>{
//     console.info("MongoSongDB connected")
//   })
  
//   .catch(err=>{
//       console.error(err)
//     }) 
    //upload a file
    // const {SONGS_MONGO_URI} = process.env;
const storage = new GridFsStorage({
    url: MONGO_URI,
    file: (req:any, file:any) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'songUploads'
                };
                console.log("new file created")
                resolve(fileInfo);
            });
        });
    }
  });
  
  const upload = multer({ storage });

// const upload = multer({ dest: "uploads/" });

export const uploadSong = (upload.single("file"), async(req:any, res:any, next:any) => {
  console.log(req.file) //after it will return the value of file
  console.log(req.body)
  const {  filename,file } = req.body;
  console.log({ filename,file });
  if(!filename || !file) throw new Error("please fill all fileds")
  
  const song = new Song({ filename,file})
    console.log(song)

  const songDB = await song.save()
      .then((songDB) => {
        res.status(200).json({
          message: 'File uploaded successfuly.',
          songDB,
        });
      })
      .catch((err) => res.status(500).json(err));
  })
// export const uploadSong = (upload.single("file"), (req, res, next) => {
//   console.log(req.file) //after it will return the value of file
//   console.log(req.body)
//     let newSong = new Song({
//       caption: req.body.caption,
//       filename: req.file.filename,
//       fileId: req.file.id,
//     });

//     // console.log("````song`````")
//     console.log(newSong)

//     newSong
//       .save()
//       .then((song) => {
//         res.status(200).json({
//           message: 'File uploaded successfuly.',
//           song,
//         });
//       })
//       .catch((err) => res.status(500).json(err));
//   })
//   .catch((err) => res.status(500).json(err));
// });

// const url = SONGS_MONGO_URI;
    const connect = mongoose.createConnection(MONGO_URI);

    let gridFS;

    connect.once('open', () => {
        // initialize stream
        gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "songUploads"
        });
    }); 

//Delete a particular file using its ObjectId
// export const deleteSong =((req, res, next) => {
//     gridFS.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//       if (err) {
//         return res.status(404).json({ err: err });
//       }
  
//       res.status(200).json({
//         success: true,
//         message: `File successfully deleted`,
//       });
//     });
//   });
  