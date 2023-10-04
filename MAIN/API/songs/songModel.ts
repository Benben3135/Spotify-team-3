import mongoose from "mongoose";
const Schema = mongoose.Schema

const SongSchema = new Schema({
    name: {
        type: String
    },
    artist: {
        type: String
    },
}, )

export const Song = mongoose.model('Song', SongSchema)