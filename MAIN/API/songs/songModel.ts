import mongoose from "mongoose";
const Schema = mongoose.Schema

const SongSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: String
    },
    avatar: {
        type: String
    }
}, {timestamps: true})

export const Song = mongoose.model('Song', SongSchema)