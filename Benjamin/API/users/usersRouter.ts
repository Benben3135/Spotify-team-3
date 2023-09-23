import express from "express";
import { registerUser , loginUser , getUserData } from "./usersCont" ;
const usersRouter = express.Router();

usersRouter.post("/register" , registerUser)
.post("/login", loginUser)
.get("/get-user", getUserData)
;





export default usersRouter;