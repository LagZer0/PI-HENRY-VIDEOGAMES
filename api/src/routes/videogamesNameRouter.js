const Router = require("express");

const {videogameNameHandler} = require("../handlers/videogamesHandler");

videogamesRouter = Router();

videogamesRouter.get("/:name", videogameNameHandler);

module.exports = videogamesRouter;