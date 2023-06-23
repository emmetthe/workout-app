import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'errors',
  initialState: '',
  reducers: {
    receiveErrors: (state, action) => {
      return action.payload;
    },
    clearErrors: () => ''
  }
});

export const {receiveErrors, clearErrors} = errorSlice.actions
export const selectErrors = (state) => state.errors;

export default errorSlice.reducer;
