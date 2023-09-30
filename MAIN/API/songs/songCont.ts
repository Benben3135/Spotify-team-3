import { SongModel,Song } from './songModel'
import mongoose from 'mongoose';
import multer from 'multer';
import methodOverride from 'method-override';
import crypto from 'crypto';
import path from 'path';
import express from "express";
const app = express();
import { GridFsStorage } from 'multer-gridfs-storage';

const {MONGO_URI} = process.env;
const connect = mongoose.createConnection(MONGO_URI);

let gridFS;

connect.once('open', () => {
    // initialize stream
    gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "songUploads"
    });
}); 
// const config = require('./config'); // Contains env. and other configs

// connect to mongoDB with mongoose
app.use(methodOverride('_method'));
mongoose.connect(MONGO_URI).then(()=>{
    console.info("MongoSongDB connected")
  })
  .catch(err=>{
      console.error(err)
    }) 

    

    //upload a file
 export const storage = new GridFsStorage({
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
                    bucketName: 'songUploads',
                    metadata: {
                        // Add metadata based on your schema
                        title: req.body.title,
                        genre: req.body.genre,
                    },
                };
                console.log("new file created")
                resolve(fileInfo);
            });
        });
    }
  });
 const upload = multer({ storage });

export function uploadSong(){
    upload.single('file'), async (req: any, res: any, next: any) => {
      console.log(req.file);
      console.log(req.body);
      const { filename, file, metadata } = req.file;
      console.log({ filename, metadata });
      if (!filename || !file) throw new Error('please fill all fields');
  
      // Create a new Song document using metadata
      const song = new SongModel({
          filename: filename,
          file: file,
          title: metadata.title,
          genre: metadata.genre,
      });
  
      console.log(song);
  
      try {
          const songDB = await song.save();
          res.status(200).json({
              message: 'File uploaded successfully.',
              songDB,
          });
      } catch (err) {
          res.status(500).json(err);
      }
}
}

//   export const getSong = async(req:any, res:any)=>{
//     try {
//         const songDB = await SongModel.find({});
//         res.send({songs:songDB})
//     } catch (error) {
//         console.error(error)
//     }
// }

// const song = new SongModel({
//     filename: __filename,
//     file: File,
//     title: metadata.title,
//     genre: metadata.genre,
// });

// console.log(song);

// try {
//     const songDB = await song.save();
//     res.status(200).json({
//         message: 'File uploaded successfully.',
//         songDB,
//     });
// } catch (err) {
//     res.status(500).json(err);
// }
// });
// export const uploadSong = (upload.single("file"), async(req:any, res:any, next:any) => {
//   console.log(req.file) //after it will return the value of file
//   console.log(req.body)
//   const {  filename,file, metadata } = req.body;
//   console.log({ filename,file, metadata });
//   if(!filename || !file) throw new Error("please fill all fileds")
  
//   const song = new Song({
//      filename:filename,
//      file:file,title: metadata.title,
//      genre: metadata.genre,
//     })
//     console.log(song)

//   const songDB = await song.save()
//       .then((songDB) => {
//         res.status(200).json({
//           message: 'File uploaded successfuly.',
//           songDB,
//         });
//       })
//       .catch((err) => res.status(500).json(err));
//   })




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
  
