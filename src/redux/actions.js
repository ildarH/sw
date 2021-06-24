import { Http } from '../api/https';
import {
  ADD_TO_FAVORITES,
  FETCH_PEOPLE_DATA,
  FETCH_PLANET_DATA,
  REMOVE_FROM_FAVORITES,
  SHOW_PEOPLE_ERROR,
  HIDE_PEOPLE_ERROR,
  SHOW_PLANET_ERROR,
  HIDE_PLANET_ERROR
} from './types';

export const fetchPeopleData = (page) => async (dispatch) => {
  dispatch({ type: HIDE_PEOPLE_ERROR });
  const url = page ? `people/${page}` : `people/`;
  try {
    const peopleResponse = await Http.get(url);
    const results = peopleResponse.results.map((people) => {
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
    dispatch({ type: FETCH_PEOPLE_DATA, payload: results });
  } catch (error) {
    dispatch({ type: SHOW_PEOPLE_ERROR, payload: 'Ошибка загрузки' });
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
    dispatch({ type: FETCH_PLANET_DATA, payload: result });
  } catch (error) {
    dispatch({ type: SHOW_PLANET_ERROR, payload: 'Ошибка загрузки' });
  }
};

export const addToFavorites = (people) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITES, payload: people });
};
export const removeFromFavorites = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_FAVORITES, payload: id });
};
