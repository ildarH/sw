import {
  FETCH_PLANET_DATA,
  SHOW_PLANET_ERROR,
  HIDE_PLANET_ERROR,
  SHOW_PLANET_LOADER,
  HIDE_PLANET_LOADER,
} from './types';

const initialState = {
  isPlanetLoading: true,
  planet: [],
  planetError: null,
};

export const planetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_PLANET_LOADER: {
      const newState = {
        ...state,
        isPlanetLoading: true,
      };
      return newState;
    }
    case HIDE_PLANET_LOADER: {
      const newState = {
        ...state,
        isPlanetLoading: false,
      };
      return newState;
    }
    case FETCH_PLANET_DATA: {
      const newState = {
        ...state,
        planet: [...state.planet, payload],
      };

      return newState;
    }
    case SHOW_PLANET_ERROR: {
      const newState = {
        ...state,
        planetError: payload,
      };
      return newState;
    }
    case HIDE_PLANET_ERROR: {
      const newState = {
        ...state,
        planetError: null,
      };
      return newState;
    }
    default:
      return state;
  }
};
