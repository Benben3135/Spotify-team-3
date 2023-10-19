import express from 'express'
import { addGenereLiked , getGeneres , addStamina } from "./algorithmsCont"
const algorithmsRouter = express.Router();


algorithmsRouter
.post("/addGenereLiked", addGenereLiked)
.get("/getGeneres", getGeneres )
.post("/addStamina", addStamina)
;
   


export default algorithmsRouter;