import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

//npm i dotenv
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;


//middlware for using parser
app.use(cookieParser())


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


import userRouter from "./API/users/userRouter";
app.use("/API/users", userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
