import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
  modalType: '',
  modalProps: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpenModal = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
      state.modalType = null;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = appSlice.actions;

export default appSlice.reducer;
