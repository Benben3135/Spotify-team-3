"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//npm i dotenv
require("dotenv/config");
const app = express_1.default();
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
app.use(cookie_parser_1.default());
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
app.use(express_1.default.static("Public"));
//body
app.use(express_1.default.json());
const { MONGO_URI } = process.env;
//connect to mongoDB with mongoose
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.info("MongoDB connected");
})
    .catch(err => {
    console.error(err);
});
// const url = config.mongoURI;
//     const connect = mongoose.createConnection(url, {});
//     let gridFS;
//     connect.once('open', () => {
//         // initialize stream
//         gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
//             bucketName: "songUploads"
//         });
//     }); 
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
const songRouter_1 = __importDefault(require("./API/songs/songRouter"));
app.use("/API/songs", songRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
