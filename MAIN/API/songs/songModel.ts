import mongoose from "mongoose";
const Schema = mongoose.Schema

const SongSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: String
    },
    file: {
        type: String
    }
}, )

export const Song = mongoose.model('Song', SongSchema)