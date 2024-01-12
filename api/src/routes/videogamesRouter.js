const { Router } = require("express");
const {
    createVideogamesHandler,
    getVideogamesHandler,
    videogamesIdHandler

} = require("../handlers/videogamesHandler")

const videogamesRouter = Router();

videogamesRouter
    .get("/", getVideogamesHandler)
    .post("/", createVideogamesHandler)
    .get("/:id", videogamesIdHandler)

module.exports = videogamesRouter;