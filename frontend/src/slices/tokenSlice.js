import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    status: null
  },
  reducers: {
    tokenActive: (state) => {
      state.status = 'active';
    },
    tokenExpired: (state) => {
      state.status = 'expired';
    },
    tokenRemoved: (state) => {
      state.status = null
    }
  }
});

export const { tokenActive, tokenExpired, tokenRemoved } = tokenSlice.actions;

export default tokenSlice.reducer;
