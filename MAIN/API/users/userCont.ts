import {UserSchema,UserModelDB } from "./userModel"
//The nodemailer package is a popular Node.js library that allows you to send email from your Node.js applications.
// terminal:
// npm install nodemailer crypto
const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { SECRET } = process.env;
const secret = SECRET;

const saltRounds = 10;




export const register = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please complete all fields");

    const hash = await bcrypt.hash(password, saltRounds);

    const user = new UserModelDB({ email, password: hash });
    const userDB = await user.save();
    console.log(userDB)
   
    res.send({ ok: true, userDB });

  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please complete all fields");

    const userDB = await UserModelDB.findOne({ email });
    if (!userDB) throw new Error("some of the details are incorrect");
    const { password: hash } = userDB;
    if (!hash) throw new Error("some of the details are incorrect");

    //check if hash password is equal to the password that the user entered
    const match:boolean = await bcrypt.compare(password, hash);
    if (!match) throw new Error("some of the details are incorrect");

    const cookie = {
      uid: userDB._id,
      admin: userDB.admin,
    }
    
    const token = jwt.encode(cookie, secret);
    console.log(token)

    res.cookie("user", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48 });
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
}

export const sendEmail = async (req: any, res: any) => {
  try {
    console.log("i started!")
    const { email } = req.body;
    if (!email) throw new Error("Please complete all fields");
    const confirmationCode = sendMail(email);
    res.send(confirmationCode);


  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
}







//this code is sending an email with a confirmation code to register the app:

function sendMail(email) {
  debugger;
  //this function generates a random code:
  function generateRandomCode() {
    const min = 100000; // Minimum 6-digit number (inclusive)
    const max = 999999; // Maximum 6-digit number (inclusive)
    const confirmationNUM = Math.floor(Math.random() * (max - min + 1)) + min;
    const confirmation = confirmationNUM.toString();
    const cookie = {
      confirmation: confirmation
    }
    
    const token = jwt.encode(cookie, secret);
  
    return confirmation;
  }
  // Generate a random confirmation code in the length of 6 digits:
  const confirmationCode = generateRandomCode();
  

  //send an email with the confirmation code:
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "teamprojectmusic3@gmail.com",
      pass: "MusicMaster3",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"MusicMaster" <teamprojectmusic3@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "your confirmation code", // Subject line
      text: `this is your confirmation code:${confirmationCode} , please insert it in the app`, // plain text body
      html: `<b>${confirmationCode}</b>`, // html body
    });
  }
  return confirmationCode;
}
