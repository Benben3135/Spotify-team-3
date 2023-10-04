//define a scheme
import { Schema, model } from 'mongoose';



export class User{
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public admin: boolean,
    public createdAt:Date,
    public artistName?: string,
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
  artistName: {
    required: false,
    type: String,
    unique:true,
    immutable:true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },

});
export default UserSchema;

export const UserModelDB = model("users", UserSchema)

