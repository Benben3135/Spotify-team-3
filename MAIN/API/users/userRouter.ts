import express from 'express'
import { login , register } from './userCont';
import { isAdmin } from './userMiddlewear';
const router = express.Router();


router.post("/login" ,login)
.post("/register", register)
;
   


export default router;