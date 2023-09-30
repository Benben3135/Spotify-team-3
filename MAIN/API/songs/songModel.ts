import {Schema, model,Document} from "mongoose";

export interface Song extends Document {
    filename: string;
    file: Buffer;
    title: string;
    genre: string;
}

 const SongSchema = new Schema({
    filename: {
        required: true,
        type: String,
    },
    file: {
        required: true,
        type: Buffer
    },
    title: String,
    genre: String,
    createAt: {
        default: Date.now(),
        type:Date,
    }
});

export const SongModel = model<Song>('Song', SongSchema);

