import { Http } from '../api/https';

import {
  ADD_TO_FAVORITES,
  FETCH_PEOPLE_DATA,
  FETCH_PLANET_DATA,
  REMOVE_FROM_FAVORITES,
  SHOW_PEOPLE_ERROR,
  HIDE_PEOPLE_ERROR,
  SHOW_PLANET_ERROR,
  HIDE_PLANET_ERROR,
  SHOW_SEARCH_ERROR,
  HIDE_SEARCH_ERROR,
  SET_SEARCH_RESPONSE,
  CLEAR_SEARCH_RESPONSE,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGE,
  SHOW_LOADER,
  HIDE_LOADER
} from './types';

const mapResponse = (response) => {
  if (response.length === 0) return null
  return response.map((people) => {
    const characterId = people.url.split('/').slice(-2).join('');
    const homeworld = people.homeworld.split('/').slice(-3).join('/');
    return {
      id: characterId,
      gender: people.gender,
      homeworld,
      name: people.name,
      pictureUrl: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`,
    };
  });
}

export const fetchPeopleData = (page) => async (dispatch) => {
  dispatch({ type: HIDE_PEOPLE_ERROR });
  dispatch({ type: SHOW_LOADER})
  const url = page ? `people/?page=${page}` : `people/`;
  try {
    const peopleResponse = await Http.get(url);
    const results = mapResponse(peopleResponse.results)
    const totalPage = Math.ceil(peopleResponse.count / 10)
    dispatch({ type: SET_TOTAL_PAGE, payload: totalPage })
    dispatch({ type: FETCH_PEOPLE_DATA, payload: results });
  } catch (error) {
    dispatch({ type: SHOW_PEOPLE_ERROR, payload: 'Ошибка загрузки' });
  } finally {
    dispatch({ type: HIDE_LOADER })
  }
};
export const fetchPlanetData = (planet) => async (dispatch) => {
  dispatch({ type: HIDE_PLANET_ERROR });
  try {
    const planetResponse = await Http.get(planet);
    const result = {
      name: planetResponse.name,
      population: planetResponse.population,
      climate: planetResponse.climate,
      gravity: planetResponse.gravity,
      terrain: planetResponse.terrain,
    };
    console.log('fetchPlanetData: ', result);
    dispatch({ type: FETCH_PLANET_DATA, payload: result });
  } catch (error) {
    dispatch({ type: SHOW_PLANET_ERROR, payload: 'Ошибка загрузки' });
  }
};
export const searchRequest = (request) => async dispatch => {
  dispatch({type: HIDE_SEARCH_ERROR})
  dispatch({type: CLEAR_SEARCH_RESPONSE})
  try {
    const response = await Http.get(`people/?search=${request}`)
    const result = mapResponse(response.results)
    dispatch ({type: SET_SEARCH_RESPONSE, payload: result})
  } catch (error) {
    dispatch({type: SHOW_SEARCH_ERROR, payload: 'Не найдено'})
  }
}
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page })
export const clearResult = () => ({type: CLEAR_SEARCH_RESPONSE})
export const addToFavorites = (people) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITES, payload: people });
};
export const removeFromFavorites = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_FAVORITES, payload: id });
};
