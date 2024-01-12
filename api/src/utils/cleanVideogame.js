const cleanVideogame = (videogame) => {
    return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.slug,
        platforms: videogame.platforms.map((platform) => platform.platform.name),
        image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres.map((genre) => genre.name),
    };
}

module.exports = cleanVideogame;