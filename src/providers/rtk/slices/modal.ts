import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  open: boolean;
  category: string;
};

const initialState: ModalState = {
  open: false,
  category: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
    openWithCategory: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.category = action.payload;
    },
    toggle: (state) => {
      state.open = !state.open;
    },
  },
});

export const { open, close, openWithCategory, toggle } = modalSlice.actions;

export default modalSlice.reducer;
