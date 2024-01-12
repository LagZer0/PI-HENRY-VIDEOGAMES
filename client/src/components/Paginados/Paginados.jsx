import React from 'react'

const paginados = ({videogamePorPage, allVideogames, paginado}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamePorPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
    <ul className="ul">
      {pageNumbers &&
        pageNumbers.map((number) => (
          
          <button onClick={() => paginado(number)} key={number}  id="pag">
            {number}
          </button>
          
        ))}
    </ul>
  </nav>
  )
}

export default paginados