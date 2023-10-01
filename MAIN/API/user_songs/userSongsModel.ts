//define a scheme
import { Schema, model } from 'mongoose';
import { User } from '../users/userModel';
import { Song } from '../songs/songModel';

export class UserSongs {
    constructor(
        public user: User,
        public song: Song,
    ){}
}

export const userSongs: UserSongs[] = [];

export class ArtistSongs {
    constructor(
        public artist: User,
        public song: Song,
    ){}
}

export const artistSongs: ArtistSongs[] = [];
