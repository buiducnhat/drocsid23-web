import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const userSettingSlice = createSlice({
  name: 'user',
  initialState: { status: 'idle', user: {} },
  reducers: {},
  extraReducers:{}
});
export default userSettingSlice;
