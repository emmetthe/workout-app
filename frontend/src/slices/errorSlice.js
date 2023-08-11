import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: ''
};

/**
 * Retrieves errors from backend
 * - initialState: ''
 * - reducers:
 *    - receiveErrors
 *    - clearErrors
 */
export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    receiveErrors: (state, action) => {
      return action.payload || '';
    },
    clearErrors: () => ''
  }
});

// actions dispatched inside components/other slices
export const { receiveErrors, clearErrors } = errorSlice.actions;
export const selectErrors = (state) => state.errors;

export default errorSlice.reducer;
