// import express from 'express'
// import { index, show, store, update, destroy} from './songCont'
// const songRouter = express.Router()


// songRouter.get('/',index)
// .post('/show',show )
// .post('/store', store)
// .patch('/update',update)
// .delete('/delete', destroy)

// export default songRouter;

import express from 'express'
import { getSong, addSong ,getUserSongs, deleteSong, updateSongName} from './songCont'
const router = express.Router()

router .get('/get-song', getSong)
.post('/add-song', addSong)
.delete('/delete-song', deleteSong)
.patch('/update-song-name', updateSongName)
// .get ('/get-user-items',getUserItems)

// router .get('/get-items/:id', getItem)
// .post('/add-item', addItem)
// .delete('/delete-item', deleteItem)
// .patch('/update-item-price', updateItem)
// .get ('/get-items',getUserItems)


export default router;

