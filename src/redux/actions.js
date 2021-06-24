import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './types'

export const addToFavorites = (people) => async dispatch => {
    dispatch({type: ADD_TO_FAVORITES, payload: people})
}
export const removeFromFavorites = (id) => async dispatch => {
    dispatch({type: REMOVE_FROM_FAVORITES, payload: id})
}