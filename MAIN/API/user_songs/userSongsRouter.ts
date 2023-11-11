import express from 'express'
import { likedSongs , likedCheck , DeletelikedSongs , getLikedsongs } from './userSongsCont';
const userSongsRouter = express.Router();


userSongsRouter
.post("/likedSongs", likedSongs)
.get("/likedCheck",likedCheck )
.post("/DeletelikedSongs", DeletelikedSongs)
.get("/get-Liked-songs", getLikedsongs)
;
   


export default userSongsRouter;