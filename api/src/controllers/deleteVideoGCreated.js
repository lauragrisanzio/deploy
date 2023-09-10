const { Videogame } = require("../db");

const deleteVideoGCreated = async (idVideogame) => {

    const videogame = await Videogame.findByPk(idVideogame);
    const aux = { ...videogame }; //copiamos el videojuego a eliminar antes de eliminarlo
    if (!videogame) throw Error("Dont exists videogame to delete");
    
    await videogame.destroy();

    return aux  //mostramos el videogame que se elimino
};

module.exports = deleteVideoGCreated;

//Puedes eliminar una instancia
//llamando al destroy de instancia en tu modelo;

//destryAll para borrar toda la base de datos