import express from 'express'
import { login , register , getUser , addArtistFunc , getArtistData } from './userCont';
import { isAdmin } from './userMiddlewear';
const userRouter = express.Router();


userRouter.post("/login" ,login)
.post("/register" , register)
.get("/get-User" , getUser)
.get("/addArtistFunc", isAdmin, addArtistFunc)
.get("/get-artist-data", getArtistData )
;
   


export default userRouter;