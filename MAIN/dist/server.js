"use strict";
// import 'dotenv/config'
// import express from "express";
// import mongoose from 'mongoose';
// import morgan from 'morgan';
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.store = exports.Song = exports.show = exports.index = void 0;
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
const path_1 = __importDefault(require("path")); // imports the Node.js path module, which provides utilities for working with file and directory paths
const multer_1 = __importDefault(require("multer")); //used for file uploads
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { upload } from './API/songs/songMiddleWare'; // Import the upload middleware
const { MONGO_URI } = process.env;
// Connect to MongoDB with mongoose
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.info('MongoDB connected');
})
    .catch((err) => {
    console.error(err);
});
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
// Static files
app.use(express_1.default.static('Public'));
// Body
app.use(express_1.default.json());
exports.index = (req, res, next) => {
    exports.Song.find()
        .then(response => {
        res.json({
            response
        });
    })
        .catch(error => {
        res.json({
            message: "An error Occured!"
        });
    });
};
//show single song
exports.show = (req, res, next) => {
    let songID = req.body.songID;
    exports.Song.findById(songID)
        .then(response => {
        res.json({
            response
        });
    })
        .catch(error => {
        res.json({
            message: 'An error Occured!'
        });
    });
};
const Schema = mongoose_1.default.Schema;
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
});
exports.Song = mongoose_1.default.model('Song', SongSchema);
//Add a song
exports.store = (req, res, next) => {
    let song = new exports.Song({
        title: req.body.title,
        genre: req.body.genre
    });
    if (req.file) {
        song.file = req.file.path;
    }
    song.save()
        .then(response => {
        res.json({
            message: 'Song Added Successfully!'
        });
    })
        .catch(error => {
        console.error(error);
        res.json({
            message: 'An error Occured!'
        });
    });
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        //determines the destination directory where the uploaded files will be stored
        cb(null, 'uploads/'); //cd=callback function
    },
    filename: function (req, file, cb) {
        //rename a file with current timestamp and the extension
        let ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
exports.upload = multer_1.default({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedExtensions = ['.mp3', '.mpeg'];
        // Get the file extension
        const fileExtension = path_1.default.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            callback(null, true);
        }
        else {
            console.log('Only mp3 & mpeg files are supported!');
            callback(null, false);
        }
    },
});
const songRouter = express_1.default.Router();
songRouter.get('/', exports.index)
    .post('/show', exports.show)
    .post('/store', exports.upload.single('file'), exports.store);
exports.default = songRouter;
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
// import songRouter from './API/songs/songRouter';
// Apply the file upload middleware to the 'store' route in songRouter
app.use('/API/users', userRouter_1.default);
// app.use('/API/songs', songRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
