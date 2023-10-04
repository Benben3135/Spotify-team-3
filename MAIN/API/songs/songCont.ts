import {Song} from './songModel'

// export const index = (req, res, next)=> {
//     Song.find()

//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: "An error Occured!"
//         })
//     })
// }

// //show single song
// export const show = (req, res, next) => {
//     let songID = req.body.songID
//     Song.findById(songID)
//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }

// //Add a song
// export const store = (req, res, next) => {
//     let song = new Song({
//         name: req.body.name,
//         artist: req.body.artist
//     })
//     song.save()
//     .then(response => {
//         res.json({
//             message: 'Song Added Successfully!'
//         })
//     })
//     .catch(error => {
//         console.error(error);
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }

// //update a song
// export const update = (req,res,next) => {
//     let songID = req.body.songID

//     let updatedData = {
//         name: req.body.name,
//         artist: req.body.artist
//     }

//     Song.findByIdAndUpdate(songID, {$set: updatedData})
//     .then(()=>{
//         res.json({
//             message: 'Song updated successfully!'
//         })
//     })
//     .catch(error=> {
//         res.json({
//             message: 'An error Occured!'
//         })
//     })
// }

// //delete a song
// export const destroy = (req,res,next) => {
//     let songID = req.body.songID
//     Song.findOneAndRemove(songID)
//     .then(()=>{
//         res.json({
//             message: 'Song deleted successfully!'
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: 'An error Occured!'
//         })
//     })

// }




export const getSong = async(req:any, res:any)=>{
    try {
        // const {email} = 
        const songDB = await Song.find({});
        res.send({songs:songDB})
    } catch (error) {
        console.error(error)
    }
}


export const addSong = async(req:any, res:any)=>{
    try {
        const { name,artist} = req.body;
        console.log({name,artist});
        if(!name || !artist) throw new Error("Please fill all fileds");
        // if(!email) throw new Error("No email");
   
        // Add item using mongoose
        const song = new Song({name,artist});
        const songDB = await song.save();
        console.log(songDB)
        
        res.send({ ok:true })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}

export const getUserSongs = async(req:any, res:any)=>{
    try {
        const { email } = req.query;
        if(!email) {
            throw new Error("email is required");
        }
        
        const songsDB = await Song.find({ email });
        res.send({Song:songsDB })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}

// export const getItem = async(req:any, res:any)=>{
//     try {
//         const {id} = req.query;
//         const itemDB = await CrossfitItem.findById(id);
//         // res.send({CrossfitItem:itemDB})
//         res.status(200).json(itemDB);
//     } catch (error) {
//         console.error(error)
//     }
// }
// export const getUserItems = async(req:any, res:any)=>{
//     try {
//         const items = await CrossfitItem.find({});
//         res.send(200).json(items)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error.message });
//     }
// }


export const deleteSong = async(req:any,res:any)=>{
    try {
        //  const { email } = req.query;
        //  console.log(email)
        const { songId } = req.body;
       
        const songDB = await Song.findByIdAndDelete(songId);

        // console.log(itemDB)

        const songs = await Song.find({});

        res.send({songs})
        // res.send({ itemDB });
        // res.send("drgh")
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}

export const updateSongName = async(req:any,res:any)=> {
    try {
        const { name, id } = req.body;
        const songDB = await Song.findById(id);
        if(!songDB) throw new Error("Song not found");

        songDB.name = await Song.findByIdAndUpdate(id, {name}) ;
        res.send({ Song })
    } catch (error) {
        console.error(error);
        res.send({ error });
    }
}