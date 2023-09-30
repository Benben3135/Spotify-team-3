import express from 'express'
import { uploadSong} from './songCont'
import fs from 'fs'
const router = express.Router()


router
// .get('/get-song',getSong )
.post('/upload-file', uploadSong)
// .post('/upload-file', uploadSong)




export default router;
// import { uploadSong,deleteSong } from './songCont'
// .delete('/delete-file/:id',deleteSong)