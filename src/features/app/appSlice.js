import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onMicrophone: true,
  onCamera: true,
  onScreenShare: false,
  onVolume: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnMicrophone: (state, action) => {
      state.onMicrophone = action.payload;
    },
    setOnCamera: (state, action) => {
      state.onCamera = action.payload;
    },
    setOnScreenShare: (state, action) => {
      state.onScreenShare = action.payload;
    },
    setOnVolume: (state, action) => {
      state.onVolume = action.payload;
    },
  },
});

export const { setOnMicrophone, setOnCamera, setOnScreenShare, setOnVolume } =
  appSlice.actions;

export default appSlice.reducer;
