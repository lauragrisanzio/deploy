const getGenres = require("../controllers/getGenres");

const getGenresHandler = async (req, res) => {
 
  try {
      const getGenresAll = await getGenres()
     return res.status(200).json(getGenresAll);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "No hay generos de videojuegos " }); //en ingles
  }
};

module.exports = getGenresHandler;
