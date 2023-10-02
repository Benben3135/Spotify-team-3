import 'dotenv/config'
import express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';


const {MONGO_URI} = process.env;
//connect to mongoDB with mongoose
mongoose.connect(MONGO_URI) //{useNewUrlParser:true, useUnifiedTopology:true}
.then(()=>{
  console.info("MongoDB connected")
})

.catch(err=>{
  console.error(err)
})


// const db = mongoose.connection

// db.on('error', (err)=>{
//   console.log(err);
// })

// db.once('open', ()=> {
//   console.log('Database Connection Established!');
// })


//npm i dotenv
const app = express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   console.log('Request Headers:', req.headers);
//   next();
// });

// middlware for using parser
app.use(cookieParser())

//static files
app.use(express.static("Public"));

//body
app.use(express.json());


import userRouter from "./API/users/userRouter";
app.use("/API/users", userRouter);

import { upload } from './API/songs/songMiddleWare';
import { store } from './API/songs/songCont';

import songRouter from "./API/songs/songRouter";
app.use("/API/songs", songRouter);


// app.use('/API/songs', upload.single('avatar'), songRouter);
app.post('/API/songs/store', upload.single('avatar'), store);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
