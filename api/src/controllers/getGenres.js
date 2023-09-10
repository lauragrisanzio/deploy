const axios = require("axios");
const { Genres, Videogame } = require("../db");

const { API_KEY } = process.env;

const getGenres = async () => {
    try {
    const database = await Genres.findAll();
        if (database.length > 0) return database;
        else {
            const { data } = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        if (!data) throw new Error("Not found");
        
        const allGenres = await data.results.map((g) => {
            Genres.findOrCreate({
                where: {
                    id: g.id,
                    name: g.name
                }
            });
        });  
          return allGenres;   
        };
            
    } catch (error) {
        throw Error("No hay datos para mostrar");
    }
};

module.exports = getGenres