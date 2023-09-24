import { UserModelDB } from "../users/userModel";
import {userSongs} from "./userSongsModel"

// get user-songs (all the songs in his list)

export async function getUserSongs(req: any, res: any){ //this fun' need to load when main page of the user load (after lodgin)
    try {
        //get user id from cookie
        const userId = req.cookies.user.uid; //speshel identefayer
        console.log("userID after login:", userId)
        if (!userId) {
            throw new Error("userID is required");
        }
        
        const userSongsDB = await UserModelDB.find({ userId });
     
        console.log("user songs from DB in getUserSongs:", userSongsDB)
        
        res.send({ songs: userSongsDB });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}



// get creator-songs (only the songs that he created)


// add song to user list
//delete song from user list