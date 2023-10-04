import mongoose from "mongoose";
const Schema = mongoose.Schema

const SongSchema = new Schema({
    name: {
        type: String
    },
    artist: {
        type: String,
        unique: true
    },
    genre: String
}, )

export const Song = mongoose.model('Song', SongSchema)