import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import logger from 'redux-logger'
import errorReducer from '../slices/errorSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
