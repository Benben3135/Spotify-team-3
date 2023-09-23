import express from "express";
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3000;
//static files
app.use(express.static("public"));

//body
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
import usersRouter from "./API/users/usersRouter";
app.use("/API/users", usersRouter);
import habitsRouter from "./API/habits/habitsRouter"
app.use("/API/habits", habitsRouter);










const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://benben3135:cpoI5wCWhSRm5jlw@cluster0.nmg3euq.mongodb.net/');
  console.log('Connected to Atlas');

}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



