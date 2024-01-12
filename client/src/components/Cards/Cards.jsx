import React from 'react'
import Card from '../Card/Card'

import './cards.styles.css'

// const Cards = ({allVideogames}) => {
 
//   const gamesList = allVideogames
  
//   console.log("LO QUE ME LLEGA" + gamesList)
 
//   if (Array.isArray(gamesList)) {
//     return (
//       <div className="card-list">
//         {gamesList.map((game) => {
//           if (Array.isArray(game)) {
//             // Si el elemento es un arreglo, aplanarlo y mapearlo
//             return game.flat().map((nestedGame) => (
//               <Card game={nestedGame} key={nestedGame.id} />
//             ));
//           } else {
//             // Si el elemento no es un arreglo, renderizar directamente
//             return <Card game={game} key={game.id} />;
//           }
//         })}
//       </div>
//     );
//   }
  
// }

// export default Cards

const Cards = ({ allVideogames }) => {
  const gamesList = allVideogames;


  if (Array.isArray(allVideogames)) {
    if (allVideogames.length === 0) {
      return (
        <div className="card-list">
          <p>Cargando datos...</p>
        </div>
      );
    }
    return (
      <div className="card-list">
        {allVideogames.map((game) => (
          <Card game={game} key={game.id} />
        ))}
      </div>
    );
  } else if (typeof allVideogames === 'object') {
    return (
      <div className="card-list">
        <Card game={allVideogames} key={allVideogames.id} />
      </div>
    );

  } else {
    return (
      <div className="card-list">
        <p>No se encontraron videojuegos con ese nombre o id.</p>
      </div>
    );
  }
};

export default Cards;