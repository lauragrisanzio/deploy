//traer solo los videojuegos creados por el usuario
const { Videogame, Genres } = require("../db");

const getVideoGCreated = async () => {

    const videogamesDatabase = await Videogame.findAll({
   include: {
     model: Genres,
     attributes: ["name"],
     through: {
       attributes: [], //de la tabla intermedia no quiero nada
     },
   },
    });

    return videogamesDatabase
}

module.exports = getVideoGCreated;
 