import { configureStore } from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';
import userSettingSlice from "src/features/userSetting/userSettingSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user:userSettingSlice.reducer,
  },
});
