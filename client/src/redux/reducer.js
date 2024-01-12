import { GET_VIDEOGAMES, GET_GENRES, GET_BY_NAME, GET_BY_ID, CLEAR, GET_BY_DETAIL, 
  FILTER_BY_GENRE, ORDER_BY_NAME, FILTER_CREATED, ORDER_BY_RATING, MIX_FILTERS, POST_VIDEOGAME } from '../redux/actions';

const initialState = {
    videogames: [],
    allVideogames: [],
    allGenres: [],
    platforms: [],
    details: {},
    filteredVideogames: []
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_VIDEOGAMES:
        let platforms = [];
        action.payload.map((e) => (platforms = [...platforms, ...e.platforms]));
        return {
          ...state,
          videogames: [...action.payload],
          allVideogames: [...action.payload],
          platforms: Array.from(new Set(platforms)),
          page: 1,
        };
  
      case GET_BY_NAME:
        return {
          ...state,
          videogames: action.payload,
        };
  
        
      case GET_GENRES:
        return {
          ...state,
          allGenres: action.payload,
        };
  
      case GET_BY_ID:
          return {
            ...state,
            videogames: action.payload
          };
      case GET_BY_DETAIL:
        return {
          ...state,
          details: action.payload
        }

      case CLEAR:
            return {
                ...state,
                details : action.payload
            }

      case FILTER_BY_GENRE:
        const allVideogames2 = state.allVideogames;
        const genreFiltered = action.payload === 'All' ? allVideogames2 : allVideogames2.filter((game) => game.genres.includes(action.payload));
        return {
          ...state,
          videogames: genreFiltered
        };
      
        case "FILTER_CREATED":
          const allvideogames = state.allVideogames;
          const filterDb =
            action.payload === "created"
              ? allvideogames.filter((e) => e.inDb)
              : allvideogames.filter((e) => !e.inDb);
         
          return {
            ...state,
            videogames:
              action.payload === "all" ? state.allVideogames : filterDb,
          };
      
        case ORDER_BY_NAME:
          let sortedArr = [...state.videogames];
          if (action.payload === "asc") {
            sortedArr.sort(function (a, b) {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
          } else if (action.payload === "desc") {
            sortedArr.sort(function (a, b) {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
              return 0;
            });
          }
          return {
            ...state,
            videogames: sortedArr,
          };
      
      case ORDER_BY_RATING:
        let arrRating =
        action.payload === "least" ?
        state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (b.rating > a.rating) {
            return -1;
          }
          return 0;
        })
        :
        state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        })

        return {
          ...state,
          videogames: arrRating
        }
        
      case MIX_FILTERS:
        const { order, rating } = action.payload;

        // Copia de los videojuegos originales
        let filteredVideogames = [...state.videogames];

        // Filtrar por orden (ascendente o descendente)
        if (order === 'asc') {
          filteredVideogames.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'desc') {
          filteredVideogames.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Filtrar por rating (más o menos popular)
        if (rating === 'least') {
          filteredVideogames.sort((a, b) => a.rating - b.rating);
        } else if (rating === 'most') {
          filteredVideogames.sort((a, b) => b.rating - a.rating);
        }

        return { ...state, filteredVideogames, currentPage: 1 };
      
  
        default: {
            return state;
        }
        }
    }

export default rootReducer;