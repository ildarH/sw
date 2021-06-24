import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducer';

const presistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

export const store = createStore(
  combineReducers({ root: persistReducer(presistConfig, rootReducer) }),
  applyMiddleware(thunk),
);
export const persistor = persistStore(store);
