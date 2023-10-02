"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const { MONGO_URI } = process.env;
//connect to mongoDB with mongoose
mongoose_1.default.connect(MONGO_URI) //{useNewUrlParser:true, useUnifiedTopology:true}
    .then(() => {
    console.info("MongoDB connected");
})
    .catch(err => {
    console.error(err);
});
// const db = mongoose.connection
// db.on('error', (err)=>{
//   console.log(err);
// })
// db.once('open', ()=> {
//   console.log('Database Connection Established!');
// })
//npm i dotenv
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//   console.log('Request Headers:', req.headers);
//   next();
// });
// middlware for using parser
app.use(cookie_parser_1.default());
//static files
app.use(express_1.default.static("Public"));
//body
app.use(express_1.default.json());
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
const songMiddleWare_1 = require("./API/songs/songMiddleWare");
const songCont_1 = require("./API/songs/songCont");
const songRouter_1 = __importDefault(require("./API/songs/songRouter"));
app.use("/API/songs", songRouter_1.default);
// app.use('/API/songs', upload.single('avatar'), songRouter);
app.post('/API/songs/store', songMiddleWare_1.upload.single('avatar'), songCont_1.store);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
