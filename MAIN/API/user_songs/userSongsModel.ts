import { Schema, model } from 'mongoose';
import { UserSchema, UserModelDB } from '../users/userModel';




export class UserClass{
    constructor(
      public name: string,
      public email: string,
      public password: string,
      public admin: boolean,
      public createdAt:Date,
      public artistName?: string,
      ){}
  }

  export class SongClass{
    constructor(
      public name: string,
      public artist: string,
      public genre: string,
      public fileName: string
      ){}
  }

  export class userLikedSongs{
    constructor(
    public email: string,
    public fileName: string,
    ){}
}

//join collection DB

export const LikedSongsSchema = new Schema({
  email: String,
  fileName: String

});
export default LikedSongsSchema;

export const LikedSongsDB = model("likedSongs", LikedSongsSchema)