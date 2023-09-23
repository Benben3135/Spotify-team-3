//define a scheme
import { Schema, model } from 'mongoose';



// DB models
//model for user, conatains its:
//  name (for DOM manipulations like greeting)
// email (for authintication and as identifier)
// password (for authintication)
//admin Boolean propertie, to check if the user can add new song and etc.
//created at- a propertie automatically creates in the DB to know when the user has been created. will be used in info section.
export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  admin: {
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

