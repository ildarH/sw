import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './types';

const initialState = {
  favorites: [],
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_FAVORITES: {
      const newState = {
        ...state,
        favorites: [...state.favorites, payload],
      };
      return newState;
    }
    case REMOVE_FROM_FAVORITES: {
      const newState = {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== payload),
      };
      return newState;
    }
    default:
      return state;
  }
};
