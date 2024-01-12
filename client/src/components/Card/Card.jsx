//rafce

import React from 'react'
import './card.styles.css'
import {Link} from 'react-router-dom'


// const Card = ({game}) => {

//   const {name, image, genres, id} = game

  



//   return (
//     <div className="card-container">
//        <Link to = {`/details/${id}`}>
//        <h2>{name}</h2>
//        <br/>
//        <img src={image} alt={name} className="card-image"/>
//        {/* <p>{descripcion}</p>
//        <p>{released}</p>
//        <p>{rating}</p>
//        <p>Plataformas:</p>
//        {plataformas.map((plataforma) => (
//         <p key={plataforma.name}>{plataforma.name}</p>
//       ))} */}
//       <p className="genres">Generos:</p>
//    {genres.flat().map((genre, index) => (
//         <p key={index} className="genres">
//           {genre.name || genre}
//         </p>
//       ))}
     
//     </Link>
        
//     </div>
//   )
// }

// export default Card

// ...

const Card = ({ game }) => {
  const { name, image, genres, id } = game;

  return (
    <div className="card-container">
      <Link to={`/details/${id}`} className='Link-card'>
        <h2 className="card-name">{name}</h2>
        <br />
        <img src={image} alt={name} className="card-image" />
        <p className="genres">Géneros:</p>
        {Array.isArray(genres) ? (
          genres.map((genre, index) => (
            <p key={index} className="genres">
              {genre.name || genre}
            </p>
          ))
        ) : (
          <p className="genres">{genres}</p>
        )}
      </Link>
    </div>
  );
};

export default Card;
