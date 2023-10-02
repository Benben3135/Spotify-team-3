import {Song} from './songModel'

export const index = (req, res, next)=> {
    Song.find()

    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error Occured!"
        })
    })
}

//show single song
export const show = (req, res, next) => {
    let songID = req.body.songID
    Song.findById(songID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//Add a song
export const store = (req, res, next) => {
    let song = new Song({
        title: req.body.title,
        genre: req.body.genre
    })
    if(req.file){
        song.avatar = req.file.path
    }
    song.save()
    .then(response => {
        res.json({
            message: 'Song Added Successfully!'
        })
    })
    .catch(error => {
        console.error(error);
        res.json({
            message: 'An error Occured!'
        })
    })
}

//update a song
export const update = (req,res,next) => {
    let songID = req.body.songID

    let updatedData = {
        title: req.body.title,
        genre: req.body.genre
    }

    Song.findByIdAndUpdate(songID, {$set: updatedData})
    .then(()=>{
        res.json({
            message: 'Song updated successfully!'
        })
    })
    .catch(error=> {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete a song
export const destroy = (req,res,next) => {
    let songID = req.body.songID
    Song.findOneAndRemove(songID)
    .then(()=>{
        res.json({
            message: 'Song deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })

}