import {Schema, model} from "mongoose";

export const SongSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    createAt: {
        default: Date.now(),
        type:Date,
    }
});

export const Song = model('Song', SongSchema);

