import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

export const getVideogames = () => {

    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/videogames');
    
        dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
        })
    }    
    
}


export const GET_GENRES = 'GET_GENRES';



export function getGenres(){
    return async function(dispatch){
      try{
        var info = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: 'GET_GENRES',
            payload: info.data 
        });
      }catch (error){
        console.log("Error en getGenres/actions", error);
      }
    };
  };
  

export const GET_BY_NAME = 'GET_BY_NAME';

export const getByName = (name) => {
    
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/videogamesname/${name}`);
    
        dispatch({
            type: GET_BY_NAME,
            payload: response.data
        })
    }
}

export const GET_BY_ID = 'GET_BY_ID';

export const getById = (id) => {
    
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);

        dispatch({
            type: GET_BY_ID,
            payload: response.data
        })
    }
}

export const CLEAR = 'CLEAR';

export function clear(){
    return{
        type: 'CLEAR',
        payload : []
    }
  }

export const GET_BY_DETAIL = 'GET_BY_DETAIL';

export const getDetail = (id) => {
    
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    
        dispatch({
            type: GET_BY_DETAIL,
            payload: response.data
        })
    }
}

export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';

export const filterByGenre = (genre) => {

    return {
        type: FILTER_BY_GENRE,
        payload: genre
    }
}

export const FILTER_CREATED = 'FILTER_CREATED';

export const filterCreated = (created) => {
    return{
        type: FILTER_CREATED,
        payload: created
    }
}

export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}

export const ORDER_BY_RATING = 'ORDER_BY_RATING';

export const orderByRating = (order) => {
    return {
        type: ORDER_BY_RATING,
        payload: order
    }
}



export const POST_VIDEOGAME = 'POST_VIDEOGAME';

export function postVideogame (payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/videogames', payload);
        return response;
    }
}


export const MIX_FILTERS = 'MIX_FILTERS';

export const mixFilters = (filters) => {

    return {
        type: MIX_FILTERS,
        payload: filters
    }
}