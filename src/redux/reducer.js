import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './types';

const initialState = {
  favorites: [],
  id: []
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_FAVORITES: {
      const newState = {
        ...state,
        favorites: [...state.favorites, payload],
        id: [...state.id, payload.id]
      };
      return newState;
    }
    case REMOVE_FROM_FAVORITES: {
      const newState = {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== payload),
        id: state.id.filter((id) => id !== payload)
      };
      return newState;
    }
    default:
      return state;
  }
};
