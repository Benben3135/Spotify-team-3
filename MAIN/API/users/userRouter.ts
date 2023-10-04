import express from 'express'
import { login , register , getUser , addArtistFunc } from './userCont';
import { isAdmin } from './userMiddlewear';
const userRouter = express.Router();


userRouter.post("/login" ,login)
.post("/register" , register)
.get("/get-User" , getUser)
.get("/addArtistFunc", isAdmin, addArtistFunc)
;
   


export default userRouter;