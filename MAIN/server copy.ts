import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

//npm i dotenv
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3004;


//middlware for using parser
app.use(cookieParser())


//static files
app.use(express.static("public"));

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

// get router from usersRouter
import userRouters from "./API/users/userRouter";
//tells express to use proudctsRouter on the intial route "/API/users"
app.use("/API/users", userRouters);

// get router from image
// import imgRouters from "./API/images/imgRoutes"
// //tells express to use proudctsRouter on the intial route "/API/users"
// app.use("/API/images", imgRouters);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
