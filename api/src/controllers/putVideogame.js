const {Videogame, Genres} = require("../db")

const putVideogame = async (id,{
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  rating_top,
  GenreId,
}) => {

  // const videoGamedb = await Videogame.findOne({
  //   where: { id: id },
  // });
  const videoGamedb = await Videogame.findByPk(id)
  
  // console.log(videoGamedb);

  if (videoGamedb) {
    videoGamedb.update(
   {name,
    description,
    platforms,
    background_image,
    released,
    rating,
    rating_top,
   }
    // {
    //   where: { id: id },
    // }, 
   
  );
  }
  // console.log(videoGamedb);

 
 if (!videoGamedb) throw Error("el juego a modificar no se encuentta");
  // await videoGamedb.addGenres(GenreId);

  return videoGamedb;
};

module.exports = putVideogame;