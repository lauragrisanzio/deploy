const axios = require("axios");
const { Genres, Videogame } = require("../db");

const { API_KEY } = process.env;

const getVideoGById = async (idVideogame) => {
   
    if (idVideogame.includes("-")) {
        const videoGamedb = await Videogame.findByPk(idVideogame, {
            include: {
                model: Genres,
                // attributes: ["name"],
                through: {
                    atributes: [],
                },
            },
        });
        return videoGamedb;
    } else {
        const { data } = await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        
        const videogameId =  {
                id: data.id,
                name: data.name,
                released: data.released,
                background_image: data.background_image,
                rating: data.rating,
                rating_top: data.rating_top,
                platforms: data.platforms.map((p) => p.platform.name),
            genres: data.genres.map((g) => g.name),
                description: data.description,
        }
         
       
        return videogameId;
    };
};
  
module.exports = getVideoGById;

//primero verificamos si el id recibido es un uuid, el cual tiene guion, si no tiene guion busca en la api
//se descarta primero la busqueda en la bdd