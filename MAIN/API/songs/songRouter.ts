import express from 'express'
import { uploadSong,getSong } from './songCont'
const router = express.Router()


router
.get('/get-file',getSong )
.post('/upload-file', uploadSong)




export default router;
// import { uploadSong,deleteSong } from './songCont'
// .delete('/delete-file/:id',deleteSong)