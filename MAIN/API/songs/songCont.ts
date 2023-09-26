import { SongSchema,Song } from './songModel'
import mongoose from 'mongoose';
const multer = require('multer');
const methodOverride = require('method-override');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('./config'); // Contains env. and other configs


//upload a file
const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
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
                resolve(fileInfo);
            });
        });
    }
  });
  
  const upload = multer({ storage });



export const uploadSong = (upload.single("file"), (req, res, next) => {
    let newSong = new Song({
      caption: req.body.caption,
      filename: req.file.filename,
      fileId: req.file.id,
    });

    newSong
      .save()
      .then((song) => {
        res.status(200).json({
          message: 'File uploaded successfuly.',
          song,
        });
      })
      .catch((err) => res.status(500).json(err));
  })
//   .catch((err) => res.status(500).json(err));
// });

const url = config.mongoURI;
    const connect = mongoose.createConnection(url, {});

    let gridFS;

    connect.once('open', () => {
        // initialize stream
        gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "songUploads"
        });
    }); 

//Delete a particular file using its ObjectId
export const deleteSong =((req, res, next) => {
    gridFS.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.status(200).json({
        success: true,
        message: `File successfully deleted`,
      });
    });
  });
  