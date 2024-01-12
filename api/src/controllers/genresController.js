const {Genres} = require("../db");

const axios = require('axios');

const {API_KEY} = process.env;


const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;



const getGenres = async () => {
    const response = await axios.get(URL);
    const data = response.data.results;


    data.forEach(genres =>{
        Genres.findOrCreate({ where : { name : genres.name} })
      })
      const allGenres = await Genres.findAll();
      return allGenres
}

module.exports = getGenres;