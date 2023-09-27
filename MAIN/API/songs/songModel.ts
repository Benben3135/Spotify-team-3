import {Schema, model} from "mongoose";

export const SongSchema = new Schema({
    filename: {
        required: true,
        type: String,
    },
    file: {
        required: true,
        type: Buffer
    },
    createAt: {
        default: Date.now(),
        type:Date,
    }
});

export const Song = model('Song', SongSchema);

