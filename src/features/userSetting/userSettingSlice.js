import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const userSettingSlice = createSlice({
  name: 'user',
  initialState: {status: 'idle', user: {}},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(changePassword.fulfilled, (state, action) => {

    })
    builder.addCase(changePassword.rejected, (state, action) => {
      state.status = 'error';
    })
  }

})
const api = axios.create();
export const updateUser = createAsyncThunk("user/updateUser", async (id, newUser) => {
  const data = await api.patch(`/${id}`, {newUser})
  return data.data;
})

export const changePassword = createAsyncThunk("user/changePassword", async (id, newPassword) => {
  const data = await api.patch(`/${id}`, {newPassword})
  return data.data;
})

export default userSettingSlice
