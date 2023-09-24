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


export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
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








