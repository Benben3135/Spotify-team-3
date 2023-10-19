import { Schema, model } from 'mongoose';
import { UserSchema, UserModelDB } from '../users/userModel';
import { SongSchema, Song } from '../songs/songModel';
import { UserClass, SongClass, userLikedSongs , LikedSongsSchema , LikedSongsDB } from './userSongsModel'

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { SECRET } = process.env;
const secret = SECRET;
const saltRounds = 10;
const axios = require('axios');


export const likedSongs = async (req: any, res: any) => {
    try {
        const data = req.body;
        const artist = data.artist;
        const name = data.name;
        const url = `http://localhost:3000/get-song_forLiked?artist=${artist}&name=${name}`;

        await axios.get(url)
            .then(response => {
                
                const [data] = response.data;
                const fileName = data.filename;
                console.log("filename in axios" , fileName)
                joinCollectionLikedSong(fileName, req , res)

            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });


    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}




async function getEmailFromCoockie(req, res) {
    try {

      
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        
        const {email} = cookie;
        return email;
      
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

async function joinCollectionLikedSong(song, req, res) {
    try {
        const email = await getEmailFromCoockie(req, res);
        createJoinCollection(song,email)
        
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: error.message });
    }
}

async function createJoinCollection(fileName,email){
    try{
    const likedSong = new LikedSongsDB({ email, fileName });
        const savedSong = await likedSong.save();
    }
    catch (error){
        console.error(error);
    }
}



export const likedCheck = async (req: any, res: any) => {
    try {
        const filename = req.query.filename;
        //find the user email from coockie
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        const {email} = cookie;
        console.log("this is the email and filename" , email , filename)
        const response = await LikedSongsDB.findOne({email:email , fileName:filename})
        console.log(response);
       
        if(response!=null){
            res.json({ isLiked: true })
        }
        else{
            res.json({ isLiked: false })
                }


    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

export const DeletelikedSongs = async (req: any, res: any) => {
    try {
        const {filename} = req.body;
        //find the user email from coockie
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        const {email} = cookie;
        await LikedSongsDB.deleteOne({email: email , fileName: filename}); 

        // Send structured response
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

export const getLikedsongs = async (req: any, res: any) => {
    try {
        const token = req.cookies.user;
        if(!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);
        const {email} = cookie;
        const likedSongs = await LikedSongsDB.find({email});
        res.json(likedSongs);
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}