const postVideogame = require("../controllers/postVideogame")

const postVideogameHandler = async (req, res) => {
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

      if (
        !name ||
        !description ||
        !platforms  ||
        !released ||
        !rating ||
        !GenreId
      )
        throw Error("Missing data");
      
    const newVideogame = await postVideogame({
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      rating_top,
       GenreId
    });
    return res.status(200).json({ created: "ok", videogame: newVideogame });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postVideogameHandler;
