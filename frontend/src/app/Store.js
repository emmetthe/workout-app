import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import logger from 'redux-logger';
import errorReducer from '../slices/errorSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import workoutReducer from '../slices/workoutSlice';
import snackbarReducer from '../slices/snackbarSlice';
import tokenReducer from '../slices/tokenSlice';

const persistConfig = {
  key: 'main-root',
  storage
};
const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  programs: workoutReducer,
  snackbar: snackbarReducer,
  token: tokenReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

let storeSettings
if (process.env.REACT_APP_NODE_ENV) {
  storeSettings = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat(logger)
  });
} else {
  storeSettings = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });
}
export const store = storeSettings
const Persistor = persistStore(store);

export { Persistor };
// export default store;
