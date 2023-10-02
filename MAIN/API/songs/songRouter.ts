import express from 'express'
const songRouter = express.Router()
import { index, show, store, update, destroy} from './songCont'
import { upload } from './songMiddleWare'

songRouter.get('/',index)
.post('/show',show )
.post('/store',upload.single('avatar'), store)
.patch('/update',update)
.delete('/delete', destroy)

export default songRouter;