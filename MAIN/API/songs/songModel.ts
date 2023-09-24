//define a scheme
import { Schema, model } from 'mongoose';

export class Song{
    constructor(
        public title: string,
        public artistNane: string,
        public lengh: string,
        public genre: string,
    ){}
}