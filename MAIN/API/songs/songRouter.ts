import express from 'express'
import { index, show, store, update, destroy} from './songCont'
import { upload } from './songMiddleWare'
const songRouter = express.Router()


songRouter.get('/',index)
.post('/show',show )
.post('/store',upload.single('file'), store)
.patch('/update',update)
.delete('/delete', destroy)

export default songRouter;