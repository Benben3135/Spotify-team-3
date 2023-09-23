//define a scheme
import { Schema, model } from 'mongoose';



// DB models

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },


});

export const UserModelDB = model("users", UserSchema)

