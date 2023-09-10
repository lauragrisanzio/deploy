const { Router } = require("express");

const getGenresHandler = require("../handlers/getGenresHandlers")

const genresRouter = Router();

genresRouter.get("/", getGenresHandler);



module.exports = genresRouter;
