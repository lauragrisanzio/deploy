const getPlatforms = require("../controllers/getPlatforms");

const getPlatformsHandler = async (req, res) => {
 
  try {
      const getPlatformsAll = await getPlatforms()
     return res.status(200).json(getPlatformsAll);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "No hay plataformas de videojuegos " }); //en ingles
  }
};

module.exports = getPlatformsHandler;
