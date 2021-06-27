import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_PEOPLE_DATA,
  SHOW_PEOPLE_ERROR,
  HIDE_PEOPLE_ERROR,
  SHOW_SEARCH_ERROR,
  HIDE_SEARCH_ERROR,
  SET_SEARCH_RESPONSE,
  CLEAR_SEARCH_RESPONSE,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGE,
  SHOW_PEOPLE_LOADER,
  HIDE_PEOPLE_LOADER,
} from './types';

const initialState = {
  isPeopleLoading: true,
  people: [],
  favorites: [],
  id: [],
  peopleError: null,
  searchError: null,
  searchResponse: null,
  currentPage: 1,
  totalPage: 0,
};

export const peopleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_PEOPLE_LOADER: {
      const newState = {
        ...state,
        isPeopleLoading: true,
      };
      return newState;
    }
    case HIDE_PEOPLE_LOADER: {
      const newState = {
        ...state,
        isPeopleLoading: false,
      };
      return newState;
    }
    case FETCH_PEOPLE_DATA: {
      const newState = {
        ...state,
        people: payload,
      };
      return newState;
    }
    case ADD_TO_FAVORITES: {
      const newState = {
        ...state,
        favorites: [...state.favorites, payload],
        id: [...state.id, payload.id],
      };
      return newState;
    }
    case REMOVE_FROM_FAVORITES: {
      const newState = {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== payload),
        id: state.id.filter((id) => id !== payload),
      };
      return newState;
    }
    case SHOW_PEOPLE_ERROR: {
      const newState = {
        ...state,
        peopleError: payload,
      };
      return newState;
    }
    case HIDE_PEOPLE_ERROR: {
      const newState = {
        ...state,
        peopleError: null,
      };
      return newState;
    }
    case SET_SEARCH_RESPONSE: {
      const newState = {
        ...state,
        searchResponse: payload,
      };
      return newState;
    }
    case CLEAR_SEARCH_RESPONSE: {
      const newState = {
        ...state,
        searchResponse: null,
      };
      return newState;
    }
    case SHOW_SEARCH_ERROR: {
      const newState = {
        ...state,
        searchError: payload,
      };
      return newState;
    }
    case HIDE_SEARCH_ERROR: {
      const newState = {
        ...state,
        searchError: null,
      };
      return newState;
    }
    case SET_TOTAL_PAGE: {
      const newState = {
        ...state,
        totalPage: payload,
      };
      return newState;
    }
    case SET_CURRENT_PAGE: {
      const newState = {
        ...state,
        currentPage: payload,
      };
      return newState;
    }
    default:
      return state;
  }
};
