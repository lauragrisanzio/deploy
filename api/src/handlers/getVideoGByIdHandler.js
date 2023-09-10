const getVideoGById = require("../controllers/getVideoGById");

const getVideoGByIdHandler = async (req, res) => { 
    const { idVideogame } = req.params;
    
    try {
        const videoId = await getVideoGById(idVideogame);
        res.status(200).json(videoId)
    
    } catch (error) {
        
    res.status(400).json({error:error.message})
}
};

module.exports = getVideoGByIdHandler;