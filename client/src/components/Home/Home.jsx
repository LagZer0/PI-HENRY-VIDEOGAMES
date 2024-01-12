import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getByName, getVideogames, getById, getGenres,
   filterByGenre, orderByName, filterCreated, orderByRating } from '../../redux/actions'

import React from 'react'
import Navbar from '../Navbar/Navbar'
import Cards from '../Cards/Cards'
import Paginados from '../Paginados/Paginados'
import { Link } from 'react-router-dom'

import './home.styles.css'

const Home = () => {

  const dispatch = useDispatch();

  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.allGenres);
  
  const [searchString, setSearchString] = useState('');

  const [orden, setOrden] = useState('');
  const [ordenRating, setOrdenRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePorPage,] = useState(15);

  const indexOfLastVideogame = currentPage * videogamePorPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamePorPage;

  const currentVideogames = Array.isArray(videogames) ? videogames.slice(indexOfFirstVideogame, indexOfLastVideogame) : [videogames];

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(Number(searchString))) {
      dispatch(getById(searchString));
      
    } else {
      dispatch(getByName(searchString));
      
    }
    
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  }

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  const handleFilterByGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  const handleRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrdenRating(e.target.value);
  }

  const handleName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }


  

  // useEffect(() => {
  //   dispatch(getVideogames())
  //   dispatch(getGenres())
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videogamesResponse, genresResponse] = await Promise.all([
          dispatch(getVideogames()),
          dispatch(getGenres())
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [dispatch]);


  return (
    <div className='HomeGral'>
        
        <h1 className='home-title'>Home</h1>
        <Link to="/videogames" >
          <button className='btnCrea'>Create Videogame📀</button>
        </Link>
        <button className='home-button' onClick={handleClick}>Reload Home🔃</button>

        <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className='home-selects'>
        <div onChange={handleFilterByGenre}>
          <select className="select">
            <option value="All">All Genres</option>
            {genres?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>


        <select className="select" onChange={handleName}>
          <option>Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select className="select" onChange={handleRating}>
          <option>Select Rating</option>
          <option value="least">Least Popular</option>
          <option value="most">Most Popular</option>
        </select>
        <select className="select" onChange={handleFilterCreated}>
          <option value="all">All Video Games</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
        
        </div>
        
        <div className='home-card'>
          {currentVideogames?.map((el) => {
            return (
              <Cards className='card'
              allVideogames={el} key={el.id}
            />
          )})}
        </div>
        
        <div className='paginado-home'>
        <Paginados
          videogamePerPage={videogamePorPage}
          allVideogames={videogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
        <button
          className="pag"
          onClick={(e) => handlePrev(e)}
          disabled={currentPage <= 1}
        >
          {" "}
          Prev{" "}
        </button>
        
        <button
          className="pag"
          onClick={(e) => handleNext(e)}
          disabled={currentVideogames.length < 15}
        >
          {" "}
          Next{" "}
        </button>
        </div>
    </div>
  )
}

export default Home