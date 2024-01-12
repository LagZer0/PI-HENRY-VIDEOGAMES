
const {createVideogames,getVideogamesDb,getVideogamesAPI,allVideogames, videogamesId, videogamesName} = require("../controllers/videogamesController")

const { API_KEY} = process.env
const {Videogames, Genres } = require("../db")

const axios = require('axios')


// const createVideogamesHandler = async (req,res) => {

//     const {name,image ,description, released, rating, platforms, genres} = req.body
//     try{
//     let newGame = await Videogames.create({
//         name, image, description, released, rating, platforms
//     })
//     let genInDb = await Genres.findAll({
//         where: {
//             name: Genres
//         }
//     })
//     await newGame.addGenre(genInDb)
//     res.send('New game created! =D')
  
//   } catch (error) {
//     console.log("error in post ", error);
//   }}

const createVideogamesHandler = async (req, res) => {
    const { name, image, description, released, rating, platforms, genres } = req.body;
  
    try {
      // Crea el nuevo videojuego
      const newGame = await Videogames.create({
        name, image, description, released, rating, platforms
      });
  
      if (genres && genres.length > 0) {
        // Busca los géneros en la base de datos
        const genresInDb = await Genres.findAll({
          where: {
            name: genres
          }
        });
  
        // Asocia los géneros con el videojuego creado
        await newGame.setGenres(genresInDb);
      }
  
      res.send('New game created! =D');
    } catch (error) {
      console.log("Error in post ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

const getVideogamesHandler = async (req,res) => {
    try {

        const  allVideos = await allVideogames();

        res.status(200).json(allVideos);
    } catch (error) {
        res.status(404).json({ error: error.message})
    }
}


    const videogamesIdHandler = async (req,res) => {
       try {
        const {id} = req.params;
        
        const result = await videogamesId(id)

      res.status(200).json(result)
       } catch (error) {
           res.status(404).json({error:"ACA ESTA EL ERROR? " + error.message})
       }
  }


    const  videogameNameHandler = async (req,res) => {
        try {
            const {name} = req.params;

            const videogamesNameResponse = await videogamesName(name);


            res.status(200).json(videogamesNameResponse)

        } catch (error) {
            res.status(404).json({error:"404 - No se encontraron videogames con ese nombre"})
        }
    }

module.exports = {
    createVideogamesHandler,
    getVideogamesHandler,
    videogamesIdHandler,
    videogameNameHandler
}