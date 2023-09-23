import {UserSchema,UserModelDB } from "./userModel"


const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { SECRET } = process.env;
const secret = SECRET;

const saltRounds = 10;




export const registerUser = async (req: any, res: any) => {
    try {
      const {name , email, password } = req.body;
      if (!email || !password || !name) throw new Error("Please complete all fields");
  
      //encrypt password with bcrypt.js
      const hash = await bcrypt.hash(password, saltRounds);
  
      const user = new UserModelDB({name, email, password: hash });
      const userDB = await user.save();
      console.log(userDB)
      res.send({ ok: true, userDB });
  
    } catch (error) {
      console.error(error);
      res.send({ error: error.message });
    }
  }