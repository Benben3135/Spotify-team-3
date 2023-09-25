"use strict";
exports.__esModule = true;
var Schema = new mongoose.Schema;
var ImageSchema = new Schema({
    caption: {
        required: true,
        type: String
    },
    filename: {
        required: true,
        type: String
    },
    fileId: {
        required: true,
        type: String
    },
    createdAt: {
        "default": Date.now(),
        type: Date
    }
});
var Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
