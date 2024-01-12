const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const server = require("../app");
const {API_KEY}= process.env;
const URL = `https://api.rawg.io/api/games?${API_KEY}`;

const videoG = require("./videogamesRouter")
const videoNames = require("./videogamesNameRouter")
const genres = require("./genresRouter")

//! const nameG = require("./namegames")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//! router.use('/videogames/name', nameG)

router.use('/videogames', videoG)
router.use('/videogamesname', videoNames)
router.use('/genres', genres)



module.exports = router;
