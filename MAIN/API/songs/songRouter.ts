import express from 'express'
import { uploadSong } from './songCont'
const router = express.Router()


router
.post('/upload-file', uploadSong)




export default router;
// import { uploadSong,deleteSong } from './songCont'
// .delete('/delete-file/:id',deleteSong)