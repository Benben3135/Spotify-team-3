//define a scheme
import { Schema, model } from 'mongoose';

export class User{
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public admin: boolean,
    public artist: boolean,
    public createdAt:Date
    ){}
}



export const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique:true
  },
  password: String,
  admin: {
    type: Boolean,
    default: false
  },
  artist: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },

});

export default UserSchema;

export const UserModelDB = model("users", UserSchema)

