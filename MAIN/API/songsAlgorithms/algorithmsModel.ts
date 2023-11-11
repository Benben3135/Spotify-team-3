import { Schema, model } from 'mongoose';





export const genreCounterSchema = new Schema({
    email:String,
    rock:Number,
    pop:Number,
    rap:Number,
    metal:Number,
    classic:Number,
    ambient:Number,
    worldMusic:Number,
    HipHop:Number,
    soul:Number,
    jazz:Number,
    dance:Number,
    techno:Number,
    electronic:Number
  });
  export default genreCounterSchema;
  
  export const genreCounerModelDB = model("genrecounter", genreCounterSchema)
  

