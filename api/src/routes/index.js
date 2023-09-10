const { Router } = require("express");

const videogameRouter = require("./videogame.Routes");
const genresRouter = require("./genres.Routes");

const indexRoute = Router();

indexRoute.use("/videogame", videogameRouter);
indexRoute.use("/genres", genresRouter);

module.exports = indexRoute;



//ante cada req siempre una respuesta
