import {UserSchema,UserModelDB } from "./userModel"

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { SECRET } = process.env;
const secret = SECRET;

const saltRounds = 10;


export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please complete all fields");

    const userDB = await UserModelDB.findOne({ email });
    if (!userDB){
      res.send({ error: "Email never registered" })
    }
    const { password: hash } = userDB;
    if (!hash) throw new Error("some of the details are incorrect");

    //check if hash password is equal to the password that the user entered
    const match:boolean = await bcrypt.compare(password, hash);
    if (!match){
      res.send({ error: "Password don't match!" })
    }

    const cookie = {
      email: userDB.email,
      uid: userDB._id,
      admin: userDB.admin,
      artistName: userDB.artistName
    }
    
    const token = jwt.encode(cookie, secret);

    res.cookie("user", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48 });
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
}


export const register = async (req: any, res: any) => {
  try {
    const { name, email, password, age, artistName, artistImg, artistInfo } = req.body;

    if (!email || !password) throw new Error("Please complete all fields");

    const hash = await bcrypt.hash(password, saltRounds);
    if(!artistName){
      const user = new UserModelDB({ name ,email, password: hash });
    const userDB = await user.save();
    res.send({ ok: true, userDB });}

    if(artistName){
      const userCheck = await UserModelDB.findOne({ artistName });
      if(userCheck){
        res.send({ error: "Artist name already exists" })
      }
      const user = new UserModelDB({ name ,email, password: hash,admin:true, age, artistName, artistImg, artistInfo});
    const userDB = await user.save();
   
    res.send({ ok: true, userDB });}

  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


export const getUser = async (req: any, res: any) => {
  try {
    const token = req.cookies.user;
    if(!token) throw new Error("no token");
    const cookie = jwt.decode(token, secret);
    //decoded cookie
    const {email} = cookie;
    const userDB = await UserModelDB.findOne({email});
 
    res.send(userDB);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


export const addArtistFunc = async (req: any, res: any) => {
  try {
    const artistName = req.artistName;
    res.send({artistName})
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


export const getArtistData = async (req: any, res: any) => {
  try {
    const artistName = req.query.artist;
    const artistData = await UserModelDB.findOne({artistName});
    console.log(artistData)
    res.send({artistData});
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


