import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { hideLoadingModal, showLoadingModal } from 'src/helpers/modal.helper';

import authenAPI from './authenAPI';

export const loginAction = createAsyncThunk(
  'authen/login',
  async (params, { rejectWithValue }) => {
    try {
      const response = await authenAPI.login(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const registerAction = createAsyncThunk(
  'authen/register',
  async (params, { rejectWithValue }) => {
    try {
      const response = await authenAPI.register(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getMeAction = createAsyncThunk(
  'authen/getMe',
  async (params, { rejectWithValue }) => {
    try {
      const response = await authenAPI.getMe();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    userData: null,
    isAuth: false,
    accessToken: null,

    isLogin: false,
    loginMsg: null,

    isRegister: false,
    registerMsg: null,

    isGetMe: true,
    getMeMsg: null,
  },
  reducers: {
    logout(state) {
      state.userData = null;
      state.isAuth = false;
      state.accessToken = null;
      Cookies.remove('accessToken');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMeAction.pending, (state) => {
        state.isGetMe = true;
        state.getMeMsg = null;
        showLoadingModal();
      })
      .addCase(getMeAction.fulfilled, (state, action) => {
        state.isGetMe = false;
        state.getMeMsg = null;
        state.userData = action.payload.data;
        state.isAuth = true;
        hideLoadingModal();
      })
      .addCase(getMeAction.rejected, (state, action) => {
        state.isGetMe = false;
        state.getMeMsg = action.payload.message;
        state.isAuth = false;
        state.userData = null;
        hideLoadingModal();
      })

      .addCase(loginAction.pending, (state) => {
        state.isLogin = true;
        state.isAuth = false;
        showLoadingModal();
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLogin = false;
        state.isAuth = true;
        state.accessToken = action.payload.data.token;
        state.userData = action.payload.data.data;
        Cookies.set('accessToken', action.payload.data.token);
        hideLoadingModal();
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLogin = false;
        state.isAuth = false;
        state.loginMsg = action.payload.message;
        hideLoadingModal();
        toast.error(action.payload.message || 'Wrong email or password');
      })

      .addCase(registerAction.pending, (state) => {
        state.isRegister = true;
        state.isAuth = false;
        showLoadingModal();
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isRegister = false;
        state.isAuth = true;
        state.accessToken = action.payload.data.token;
        hideLoadingModal();
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isAuth = false;
        state.registerMsg = action.payload.message;
        hideLoadingModal();
        toast.error(action.payload.message);
      });
  },
});

export const selectUserData = (state) => state.authen.userData;
export const selectIsAuth = (state) => state.authen.isAuth;
export const { logout } = authenSlice.actions;

export default authenSlice.reducer;
