import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

//npm i dotenv
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));

//middlware for using parser
app.use(cookieParser())

//static files
app.use(express.static("Public"));

//body
app.use(express.json());

// Grid.mongo = mongoose.mongo;

// conn.once('open', function(){
//   console.log('-Connection open -');
//   const gfs = Grid(conn.db);
// })

// const fs_write_stream = fs.createWriteStream(path.join(__dirname, './gridFS'))

// const readstream = gfs.createReadStream({
//   filename: 'songOne.mp3'
// })

// readstream.pipe(fs_write_stream);
// fs_write_stream.on('close', function(){
//   console.log('File has been written fully!')
// })
// //npm i dotenv
// import 'dotenv/config'
// const app = express();
// const port = process.env.PORT || 3000;




import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true}));



// //middlware for using parser
// app.use(cookieParser())
app.use(bodyParser.json());

const {MONGO_URI} = process.env;
//connect to mongoDB with mongoose
mongoose.connect(MONGO_URI).then(()=>{
  console.info("MongoDB connected")
})

.catch(err=>{
  console.error(err)
})

// const url = config.mongoURI;
    const connect = mongoose.createConnection(MONGO_URI);

    let gridFS;

    connect.once('open', () => {
        // initialize stream
        gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "songUploads"
        });
    }); 

// const {SONGS_MONGO_URI} = process.env;
const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
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
                    title: req.body.title,
                    genre: req.body.genre,
                },
              };
              resolve(fileInfo);
          });
      });
  }
});

// // const upload = multer({ storage });



    

    import songRouter from "./API/songs/songRouter";
    app.use("/API/songs", songRouter)


    
    
    import userRouter from "./API/users/userRouter";
    app.use("/API/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
