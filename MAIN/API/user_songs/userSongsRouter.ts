import express from 'express'
//import { isAdmin } from './userMiddlewear';
import { getUserSongsList } from './userSongsCont';
const userSongRouter = express.Router();


userSongRouter
.get("/get-user-songs-list", getUserSongsList)
;
   

export default userSongRouter;