import { Schema, model } from 'mongoose';

  
  //artist stamina model:

  
  export const artistStaminaSchema = new Schema({
    email:String,
    artistName:String,
    stamina: {
        type: Number,
        default: 0
    }
  });
  export default artistStaminaSchema;
  
  export const ArtistStaminaModelDB = model("artistStamina", artistStaminaSchema)
  