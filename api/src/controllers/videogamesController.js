const { Videogames, Genres } = require("../db");
const axios = require('axios')
const {API_KEY} = process.env
const APILINK = `https://api.rawg.io/api/games?key=${API_KEY}`
const URL_ID = `https://api.rawg.io/api/games/`
const clean = require("../utils/cleanVideogame")



// const createVideogames = async (
//     id,
//     name,
//     description,
//     platforms,
//     image,
//     released,
//     rating,
//     ) => {
//         const newVideogame = await Videogames.create({
//             id,
//             name,
//             description,
//             platforms,
//             image,
//             released,
//             rating,
//         });

//         return newVideogame
// }


// const getVideogamesDb = async () => {
//     const videogamesDb = await videogames.findAll();
//     return videogamesDb;
// } 

const getVideogamesDb = async () => {
    //traigo todos los juegos que hay en mi db con su relacion generos
    const GamesdB = await Videogames.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  //map solo para usar las propiedades que son necesarias
    const newGamedB = await GamesdB.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description:e.description_raw,
        image: e.image,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms,
        genres: e.genres.map((el) => el.name),
        inDb: e.inDb,
      };
    });
    return newGamedB;
  };

const getVideogamesAPI = async () => {
    let gamesArr = [];
    let URLApi = `https://api.rawg.io/api/games?key=${API_KEY}`

    try {
        for (let i = 0; i < 5; i++) { //me trae 20 por pagina y para traer 100 tengo que pegarle 5 veces
          const urlData = await axios.get(URLApi); 
          urlData.data.results 
          .map((e) => {         
              gamesArr.push({
                id: e.id,
                name: e.name,
                description: e.description_raw,
                image: e.background_image,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map((e) => e.platform.name),
                genres: e.genres.map((e) => e.name),
              });
            });
          URLApi = urlData.data.next;
        }
        return gamesArr; 
} catch (error) {
    console.log("Couldn't bring info from API", error); 
  }
}

// const videogamesId = async (id) => {
    // if (isNaN(id)) {
    //     const videogameId = await Videogames.findByPk(id);
    //     return videogameId;
    // }

    // const videogamesApi = await getVideogamesAPI();

    // const videogameId = videogamesApi.filter((videogames) => console.log(videogames.id));

    // console.log("ACA ESTA EL ID CONTROLLER ", videogameId);
    // return videogameId;
// }

const videogamesId = async (id) => {

    try {

    const videogameIdUrl = `${URL_ID}${id}?key=${API_KEY}`;
    
    // Los juegos de la api son numeros los de la base de datos no lo son 
  if(isNaN(id)) {
    const game = await Videogames.findByPk(id, {include: Genres })
    return game

}else{
    
    const gameApi = await axios.get(videogameIdUrl);
    

    const result = {
        id: gameApi.data.id,
        name: gameApi.data.name,
        description: gameApi.data.description_raw,
        image:gameApi.data.background_image,
        released: gameApi.data.released,
        genres: gameApi.data.genres.map(gen => { return { id: gen.id, name: gen.name } }),
        rating: gameApi.data.rating,
        platforms: gameApi.data.platforms.map((el) => el.platform.name)
    }
    return result
}
} catch (error) {
        res.status(404).json({ error:"ERROR NO ES UN NUMERO" + error.message})
    }    
}


// const videogamesName = async (name) => {
//   try {

//     const videogameNameURL = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;

//     const response = await axios.get(videogameNameURL);

//     const videogameResults = response.data.results;

//     const videogameNames = videogameResults.map((videogame) => videogame.name);

//     console.log("ACA ME DEVOLVERIA LOS 15 NOMBRES ", videogameNames);

//     return videogameNames;

//   } catch (error) {
//     throw new Error('No se encontraron videojuegos con ese nombre');
//   }
// };

const videogamesName = async (name) => {

    // !Realizo Consulta api
 const videogamesApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);

 // !Realizo consulta base de Datos Local
    const videogamesDB = await Videogames.findAll({
        where: {
            name: name
        },
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    // !Uno los resultados de ambas consultas
    const videogames = videogamesApi.data.results.concat(videogamesDB)
    // !Limpio los resultados
    const videogamesClean = videogames.map((videogame) => clean(videogame))
    // !Retorno los resultados
    if (videogamesClean.length != 0) {
        return (videogamesClean.slice(0, 15))
        
        
    } else {
        return error
    }
    
}   





const allVideogames = async () => {
    const dbVideogames = await getVideogamesDb();
    const apiVideogames = await getVideogamesAPI();

    const allVideogames = [...dbVideogames, ...apiVideogames];

    if (!allVideogames.length) {
        throw new Error('No se encontraron videojuegos');
    }

    return allVideogames;
}





module.exports = {
    // createVideogames,
    getVideogamesDb,
    getVideogamesAPI,
    allVideogames,
    videogamesId,
    videogamesName,
}