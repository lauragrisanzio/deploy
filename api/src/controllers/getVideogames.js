const axios = require("axios");
const { Genres, Videogame } = require("../db");

const {API_KEY} = process.env

const getVideogames = async () => {

 
    //traigo info de la api - son 6 paginas porque tienen que son un millon y minimo te piden 100 =(
    const data0 = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((response) => response.data); //aca solo traemos la pagina 1, la de
    const data1 = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
      .then((response) => response.data);
    const data2 = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
    ).then((response) => response.data);
    const data3 = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
      .then((response) => response.data);
    const data4 = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
      .then((response) => response.data);
    const data5 = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=6`)
      .then((response) => response.data);

    await Promise.all([data0, data1, data2, data3, data4, data5]).then((d) => {
      apiGameInfo = d[0].results
        .concat(d[1].results)
        .concat(d[2].results)
        .concat(d[3].results)
        .concat(d[4].results)
        .concat(d[5].results);
    });
    
    const allVideogamesApi = await apiGameInfo.map((v) => {
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

   
    //traigo info de la db:

    const videogamesDatabase = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [], //de la tabla intermedia no quiero nada
        },
      },
    });

    //unimos a los datos de la api con los de la db

    const infoVideogame = allVideogamesApi.concat(videogamesDatabase);

    //volvemos a mapear y retornamos todo junto

    const allVideogames = infoVideogame.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        released: videogame.released,
        background_image: videogame.background_image,
        rating: videogame.rating,
        rating_top: videogame.rating_top,
        platforms: videogame.platforms,
        genres: videogame.genres || videogame.Genres.map(g => g.name), //Genres.map:mapea los de la database
      };
    });


    // console.log(allVideogames);
    
    //de prueba:
    // const {data} = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`);
    // return data
  
    if (allVideogames.length === 0) {
        return "No hay videojuegos en este momento"

    }
  return allVideogames;
};
module.exports = getVideogames;

//Promise.all es en realidad una promesa que toma un arreglo de promesas como una entrada (un iterable). 
//Luego se resuelve cuando todas las promesas se resuelven o si cualquiera de ellos es rechazado.;