//solo trae los videojuegos creados por el usuario
const getVideoGCreated = require("../controllers/getVideoGCreated");

const getVideoGCreatedHandler = async (req, res) => {
  try {
      const videogameDatabase = await getVideoGCreated();
      return res.status(200).json(videogameDatabase);
  } catch (error) {
    return res
      .status(400)
      .json({error:     
          "No hay videojuegos en la base de datos o no creaste ningun videojuego todavia"
      }); //en ingles
  }
};

module.exports = getVideoGCreatedHandler;
