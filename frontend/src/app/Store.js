import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import logger from 'redux-logger';
import errorReducer from '../slices/errorSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import workoutReducer from '../slices/workoutSlice';
import snackbarReducer from '../slices/snackbarSlice'

const persistConfig = {
  key: 'main-root',
  storage
};
const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  programs: workoutReducer,
  snackbar: snackbarReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(logger)
});

const Persistor = persistStore(store);

export { Persistor };
// export default store;
