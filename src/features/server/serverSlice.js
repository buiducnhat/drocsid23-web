import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import serverAPI from './serverAPI';

export const getListJoinedServerAction = createAsyncThunk(
  'servers/getListJoinedServer',
  async (params, { rejectWithValue }) => {
    try {
      const response = await serverAPI.getJoinedServers();

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const createServerAction = createAsyncThunk(
  'servers/createServer',
  async (params, { rejectWithValue }) => {
    try {
      const response = await serverAPI.createServer(params);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getServerInfoAction = createAsyncThunk(
  'servers/getServerInfo',
  async (serverId, { rejectWithValue }) => {
    try {
      const response = await serverAPI.getServerInfo(serverId);
      const channelResponse = await serverAPI.getChannelsOfServer(serverId);

      const serverData = response.data.data;
      serverData.listChannel = channelResponse.data.data;

      console.log(serverData);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const serverSlice = createSlice({
  name: 'servers',
  initialState: {
    listJoinedServer: [],
    currentServer: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getListJoinedServerAction.fulfilled, (state, action) => {
        state.listJoinedServer = action.payload;
      })
      .addCase(createServerAction.fulfilled, (state, action) => {
        state.listJoinedServer.push(action.payload);
      })
      .addCase(getServerInfoAction.fulfilled, (state, action) => {
        state.currentServer = action.payload;
      });
  },
});

export const selectListJoinedServer = (state) => state.servers.listJoinedServer,
  selectCurrentServer = (state) => state.servers.currentServer;

export const { setCurrentServer } = serverSlice.actions;
export default serverSlice.reducer;
