const axios = require("axios");
const { Genres, Videogame } = require("../db");
const {Op} = require("sequelize")

const { API_KEY } = process.env;

const getVideogameByName = async (name) => {

  const { data } = await axios(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
  );
  if (!data) throw new Error("No se encontraron videogames con ese nombre");

  const dataApiByName = await data.results.map((v) => {
    return {
      id: v.id,
      name: v.name,
      released: v.released,
      background_image: v.background_image,
      rating: v.rating,
      rating_top: v.rating_top,
      platforms: v.platforms.map((p) => p.platform.name),
      genres: v.genres.map((g) => g.name),
    };
  });
  //aca ya me esta buscando por nombre
  const searchByNameDatabase = await Videogame.findAll({
    //findAll devuelve un array - findOne un objeto - necesitamos todos los paises que coincidan
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
    //   limit: 15,
  });

  const videogameResults = dataApiByName.concat(searchByNameDatabase);
  
  const videogameByName = videogameResults.map((v) => {
    return {
      id: v.id,
      name: v.name,
      released: v.released,
      background_image: v.background_image,
      rating: v.rating,
      rating_top: v.rating_top,
      platforms: v.platforms,
      genres: v.genres || v.Genres.map(g => g.name)
    };
  });

    // videogameByName
   
    return videogameByName.splice(0,15)
};

module.exports = getVideogameByName;

// //Page_Size para determinar cuántos registros componen una página lógica de datos.