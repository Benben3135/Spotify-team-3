import express from 'express'
import { login , register } from './userCont';
import { isAdmin } from './userMiddlewear';
const userRouter = express.Router();


userRouter.post("/login" ,login)
.post("/register" , register)
;
   


export default userRouter;