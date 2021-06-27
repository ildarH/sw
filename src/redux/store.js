import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { peopleReducer } from './peopleReducer';
import { planetReducer } from './planetReducer';

const persistPeopleConfig = {
  key: 'people',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['favorites'],
};
const persistPlanetConfig = {
  key: 'planet',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['planet'],
};
const root = combineReducers({
  people: persistReducer(persistPeopleConfig, peopleReducer),
  planet: persistReducer(persistPlanetConfig, planetReducer),
});
export const store = createStore(root, applyMiddleware(thunk));
export const persistor = persistStore(store);
