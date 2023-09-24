import express from 'express'
import { login , register , sendEmail } from './userCont';
import { isAdmin } from './userMiddlewear';
const router = express.Router();


router.post("/login" ,login)
.post("/register", register)
.post("/send-email", sendEmail)
;
   


export default router;