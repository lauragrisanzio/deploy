const deleteVideoGCreated = require("../controllers/deleteVideoGCreated");

const deleteVideoGCreatedHandler = async (req, res) => {
    const { idVideogame } = req.params;
    try {
      const videoId = await deleteVideoGCreated(idVideogame);
      res.status(200).json({ deleted: "ok", videogame: videoId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports = deleteVideoGCreatedHandler;