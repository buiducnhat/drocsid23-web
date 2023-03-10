import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'src/features/app/appSlice';
import themeReducer from 'src/features/theme/themeSlice';
import authenReducer from 'src/features/authen/authenSlice';
import userSettingSlice from 'src/features/userSetting/userSettingSlice';
import serverReducer from 'src/features/server/serverSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    theme: themeReducer,
    authen: authenReducer,
    user: userSettingSlice.reducer,
    servers: serverReducer,
  },
});
