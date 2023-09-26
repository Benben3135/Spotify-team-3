import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

//npm i dotenv
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;


//for gridFS
const crypto = require('crypto');
const methodOverride = require('method-override');
const multer = require('multer');
const bodyParser = require("body-parser");
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('./config'); // Contains env. and other configs


//middlware for using parser
app.use(cookieParser())

// const storage = new GridFsStorage({
//   url: config.mongoURI,
//   file: (req, file) => {
//       return new Promise((resolve, reject) => {
//           crypto.randomBytes(16, (err, buf) => {
//               if (err) {
//                   return reject(err);
//               }
//               const filename = buf.toString('hex') + path.extname(file.originalname);
//               const fileInfo = {
//                   filename: filename,
//                   bucketName: 'songUploads'
//               };
//               resolve(fileInfo);
//           });
//       });
//   }
// });

// const upload = multer({ storage });


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

// const url = config.mongoURI;
//     const connect = mongoose.createConnection(url, {});

//     let gridFS;

//     connect.once('open', () => {
//         // initialize stream
//         gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
//             bucketName: "songUploads"
//         });
//     }); 

    
import userRouter from "./API/users/userRouter";
app.use("/API/users", userRouter);

import songRouter from "./API/songs/songRouter";
app.use("/API/songs", songRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
