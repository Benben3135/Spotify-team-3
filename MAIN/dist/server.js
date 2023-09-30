"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const method_override_1 = __importDefault(require("method-override"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
//npm i dotenv
require("dotenv/config");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(method_override_1.default('_method'));
//middlware for using parser
app.use(cookie_parser_1.default());
//static files
app.use(express_1.default.static("Public"));
//body
app.use(express_1.default.json());
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
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
// //middlware for using parser
// app.use(cookieParser())
app.use(body_parser_1.default.json());
const { MONGO_URI } = process.env;
//connect to mongoDB with mongoose
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.info("MongoDB connected");
})
    .catch(err => {
    console.error(err);
});
// const url = config.mongoURI;
const connect = mongoose_1.default.createConnection(MONGO_URI);
let gridFS;
connect.once('open', () => {
    // initialize stream
    gridFS = new mongoose_1.default.mongo.GridFSBucket(connect.db, {
        bucketName: "songUploads"
    });
});
// const {SONGS_MONGO_URI} = process.env;
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto_1.default.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path_1.default.extname(file.originalname);
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
const songRouter_1 = __importDefault(require("./API/songs/songRouter"));
app.use("/API/songs", songRouter_1.default);
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
