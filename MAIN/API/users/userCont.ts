import {UserSchema,UserModelDB } from "./userModel"


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
   
    res.send({ ok: true, userDB }); //why we nead to send the userDB after register?

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
    
    const { password: hash } = userDB; //get the password/hash from DB
    if (!hash) throw new Error("some of the details are incorrect");

    //check if hash password is equal to the password that the user entered
    const match:boolean = await bcrypt.compare(password, hash);
    if (!match) throw new Error("some of the details are incorrect");

    const cookie = {
      uid: userDB._id,
      admin: userDB.admin,
      artisr: userDB.artist,
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


//get user by cookie data
export async function getUser(req: any, res: any) {
  try {
      //get user id from cookie
      const userId = req.cookies.user.uid;
      if (!userId) throw new Error("no user in cookies");
      
      //find user in DB
      const userDB = await UserModelDB.findById(userId);
      if(!userDB) throw new Error("user dosn't exist in DB");
      
      res.send({ok: true, users: userDB });

  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
  }
}

//delete user (only admin can)
export async function deleteUser(req: any, res: any) {
  try {
      //get user id fron cookie
      const userId = req.cookies.user.uid;
      if (!userId) throw new Error("no user id in cookies");

      //find user by id and delete
      await UserModelDB.findByIdAndDelete(userId);

      // Send ok if succead
      res.send({ ok: true });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
  }
}

