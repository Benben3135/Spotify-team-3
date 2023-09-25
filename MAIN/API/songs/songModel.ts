//define a scheme
import { Schema, model } from 'mongoose';

const Schema = new mongoose.Schema;

const ImageSchema = new Schema({
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
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;