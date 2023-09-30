import express from 'express'
import { login , register, getUser } from './userCont';
import { isAdmin } from './userMiddlewear';
const userRouter = express.Router();


userRouter.post("/login" ,isAdmin, login)
.post("/register", register)
.get("/get-User" , getUser)
;
   

export default userRouter;


