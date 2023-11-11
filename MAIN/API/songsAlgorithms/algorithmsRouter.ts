import express from 'express'
import { addGenereLiked , getGeneres , addStamina , getStaminas } from "./algorithmsCont"
const algorithmsRouter = express.Router();


algorithmsRouter
.post("/addGenereLiked", addGenereLiked)
.get("/getGeneres", getGeneres )
.post("/addStamina", addStamina)
.get("/getStaminas", getStaminas)
;
   


export default algorithmsRouter;