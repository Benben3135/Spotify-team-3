import express from 'express'
import {} from './userCont';
import { isAdmin } from './userMiddlewear';
const router = express.Router();


// router
//     .post('/login',login)
//     .post("/register", registerUser)
//     .get("/get-users",isAdmin, getUsers)
   


export default router;