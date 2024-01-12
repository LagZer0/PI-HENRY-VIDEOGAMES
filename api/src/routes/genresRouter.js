const { Router } = require('express');
const genres = require("../handlers/genresHandler");

genresRouter = Router();

genresRouter.get("/", genres);


module.exports = genresRouter;