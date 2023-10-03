// import 'dotenv/config'
// import express from "express";
// import mongoose from 'mongoose';
// import morgan from 'morgan';
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser';

// // import { GridFsStorage } from 'multer-gridfs-storage';


// const {MONGO_URI} = process.env;
// //connect to mongoDB with mongoose
// mongoose.connect(MONGO_URI) //{useNewUrlParser:true, useUnifiedTopology:true}
// .then(()=>{
//   console.info("MongoDB connected")
// })

// .catch(err=>{
//   console.error(err)
// })


// // const db = mongoose.connection

// // db.on('error', (err)=>{
// //   console.log(err);
// // })

// // db.once('open', ()=> {
// //   console.log('Database Connection Established!');
// // })


// //npm i dotenv
// const app = express();
// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// const port = process.env.PORT || 3000;

// // app.use((req, res, next) => {
// //   console.log('Request Headers:', req.headers);
// //   next();
// // });

// // middlware for using parser
// app.use(cookieParser())



// //static files
// app.use(express.static("Public"));

// //body
// app.use(express.json());


// import userRouter from "./API/users/userRouter";
// app.use("/API/users", userRouter);

// // import { upload } from './API/songs/songMiddleWare';
// import { store } from './API/songs/songCont';

// import songRouter from "./API/songs/songRouter";
// app.use("/API/songs", songRouter);


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });



// import 'dotenv/config';
// import express from 'express';
// import mongoose from 'mongoose';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import { upload } from './API/songs/songMiddleWare'; // Import the upload middleware

// const { MONGO_URI } = process.env;

// // Connect to MongoDB with mongoose
// mongoose
//     .connect(MONGO_URI)
//     .then(() => {
//         console.info('MongoDB connected');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// const app = express();
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // Static files
// app.use(express.static('Public'));

// // Body
// app.use(express.json());

// import userRouter from './API/users/userRouter';
// import songRouter from './API/songs/songRouter';

// // Apply the file upload middleware to the 'store' route in songRouter
// app.use('/API/users', userRouter);
// app.use('/API/songs', songRouter);



// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

import path from 'path' // imports the Node.js path module, which provides utilities for working with file and directory paths
import multer from 'multer' //used for file uploads
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import { upload } from './API/songs/songMiddleWare'; // Import the upload middleware

const { MONGO_URI } = process.env;

// Connect to MongoDB with mongoose
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.info('MongoDB connected');
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Static files
app.use(express.static('Public'));

// Body
app.use(express.json());



export const index = (req, res, next)=> {
  Song.find()
  
  .then(response => {
    res.json({
      response
    })
  })
  .catch(error => {
      res.json({
        message: "An error Occured!"
      })
    })
  }
  
  //show single song
  export const show = (req, res, next) => {
    let songID = req.body.songID
    Song.findById(songID)
    .then(response => {
      res.json({
        response
      })
    })
    .catch(error => {
      res.json({
        message: 'An error Occured!'
      })
    })
  }
  
  
  const Schema = mongoose.Schema
  
const SongSchema = new Schema({
  title: {
        type: String
      },
    genre: {
        type: String
    },
    file: {
        type: String
    }
}, )

export const Song = mongoose.model('Song', SongSchema)

//Add a song
export const store = (req, res, next) => {
  let song = new Song({
      title: req.body.title,
      genre: req.body.genre
    })
    if(req.file){
      song.file = req.file.path
    }
  song.save()
  .then(response => {
      res.json({
        message: 'Song Added Successfully!'
      })
    })
    .catch(error => {
      console.error(error);
      res.json({
          message: 'An error Occured!'
      })
    })
  }
  
  const storage = multer.diskStorage({
    destination: function(req,file,cb){
      //determines the destination directory where the uploaded files will be stored
      cb(null, 'uploads/')   //cd=callback function
    },
    filename: function(req,file,cb) {
      //rename a file with current timestamp and the extension
      let ext = path.extname(file.originalname)
      cb(null, Date.now()+ ext)
    }
  })
  
  
  
  export const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
      const allowedExtensions = ['.mp3', '.mpeg'];
      
      // Get the file extension
      const fileExtension = path.extname(file.originalname).toLowerCase();
      
      if (allowedExtensions.includes(fileExtension)) {
        callback(null, true);
      } else {
        console.log('Only mp3 & mpeg files are supported!');
        callback(null, false);
      }
    },
  });
  
  const songRouter = express.Router()
  
  
  songRouter.get('/',index)
  .post('/show',show )
  .post('/store',upload.single('file'), store)
  
  export default songRouter;
  import userRouter from './API/users/userRouter';
  // import songRouter from './API/songs/songRouter';
  
  // Apply the file upload middleware to the 'store' route in songRouter
  app.use('/API/users', userRouter);
  // app.use('/API/songs', songRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});