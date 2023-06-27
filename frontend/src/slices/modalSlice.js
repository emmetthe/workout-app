import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false
};

/**
 * slice contains reducers and state of redux store
 * - initialState: false
 * - reducers:
 *    - showModal
 */
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return action.payload;
    }
  }
});

// action used inside components / other slices
export const { showModal } = modalSlice.actions;

export default modalSlice.reducer;
