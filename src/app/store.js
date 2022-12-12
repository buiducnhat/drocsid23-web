import { configureStore } from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';
import authenReducer from 'src/features/authen/authenSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    authen: authenReducer,
  },
});
