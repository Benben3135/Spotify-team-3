import { genreCounterSchema, genreCounerModelDB } from "./algorithmsModel"
import { artistStaminaSchema , ArtistStaminaModelDB } from "./staminaModel"
const axios = require('axios');

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { SECRET } = process.env;
const secret = SECRET;
const saltRounds = 10;

async function getEmailFromCoockie(req, res) {
    try {


        const token = req.cookies.user;
        if (!token) throw new Error("no token");
        const cookie = jwt.decode(token, secret);

        const { email } = cookie;
        return email;

    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

export const addGenereLiked = async (req: any, res: any) => {
    try {
        const { filename } = req.body;

        // Fixed the URL format
        const url = `http://localhost:3000/get-song-by-filename?filename=${filename}`;

        // Use async/await syntax for Axios
        const response = await axios.get(url);


        // Check if data exists in the response
        if (response.data) {
            const data = response.data;
            const songMeta = data.metadata;
            const genreFromResponse = songMeta.genre;

            // Check if the genre exists in the schema
            if (Object.hasOwnProperty.call(genreCounterSchema.obj, genreFromResponse)) {

                // Fetch the document. I'm assuming there's a single document in the collection
                let genreCounts = await genreCounerModelDB.findOne();

                if (genreCounts) {
                    // Increment the count for the genre
                    genreCounts[genreFromResponse] += 1;
                    await genreCounts.save();
                    res.status(200).json({ success: true, message: 'Operation successful' });
                } else {
                    // If the document doesn't exist, create a new one
                    const email = await getEmailFromCoockie(req, res);
                    const initialCounts = { email: email };
                    for (let genre in genreCounterSchema.obj) {
                        if (genre !== "email") {
                            initialCounts[genre] = genre === genreFromResponse ? 1 : 0;
                        }
                    }
                    const newGenreCounts = new genreCounerModelDB(initialCounts);
                    await newGenreCounts.save();
                    res.status(200).json({ success: true, message: 'Operation successful' });
                }
            } else {
                console.error('Received an unknown genre:', genreFromResponse);
            }


        } else {
            console.error('No data received from the server.');
            res.status(500).json({ success: false, error: 'Error message here' });
        }

    } catch (error) {
        console.error(error);

        // Check if the error has a specific response from Axios
        if (error.response) {
            console.error("Axios error response:", error.response);
            res.send({ error: error.response.data });
        } else {
            res.send({ error: error.message });
        }
    }
};


export const getGeneres = async (req: any, res: any) => {
    try {
        const email = await getEmailFromCoockie(req, res);
        console.log("looking for all the genres")
       const genres = await genreCounerModelDB.findOne({email});
       res.send(genres);
    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

//stamina functions:

export const addStamina = async (req: any, res: any) => {
    try {
        const email = await getEmailFromCoockie(req, res);
        const filename = req.body.filename;
          // Fixed the URL format
          const url = `http://localhost:3000/get-song-by-filename?filename=${filename}`;

          // Use async/await syntax for Axios
          const response = await axios.get(url);
          const data = response.data;
          const songMeta = data.metadata;
          const artist = songMeta.artist;
          console.log(email, artist)
          const check = await ArtistStaminaModelDB.findOne({email,artist})
          if(check){
            check.stamina += 1
            check.save();
          }
          else{
            const newStaminaDB = new ArtistStaminaModelDB({ email, artist, stamina: 1 });
            await newStaminaDB.save();
          }
          res.send({ message: "Stamina updated successfully!" });

    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}