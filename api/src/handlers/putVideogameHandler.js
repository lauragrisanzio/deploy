const putVideogame = require("../controllers/putVideogame");

const putVideogameHandler = async (req, res) => {
  try {
      const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      rating_top,
      GenreId
    } = req.body;
    const { id } = req.params
    
      if (
          
        !name ||
        !description ||
        !platforms ||
        !background_image ||
        !released ||
        !rating ||
        !GenreId
      )
        throw Error("Missing data");
     
      const updateVideogame = await putVideogame(
 id,
      {name,
      description,
      platforms,
      background_image,
      released,
      rating,
      rating_top,
       GenreId}
    );
    return res.status(200).json({ updated: "ok", videogame: updateVideogame });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = putVideogameHandler;
