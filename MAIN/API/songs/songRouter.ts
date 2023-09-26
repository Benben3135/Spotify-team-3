import express from 'express'
import { uploadSong,deleteSong } from './songCont'
const router = express.Router()


router
.patch('/upload-file', uploadSong)
.delete('/delete-file/:id',deleteSong)



export default router;