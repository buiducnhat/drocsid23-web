import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoadingModal, showLoadingModal } from 'src/helpers/modal.helper';

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

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getChannelInfoAction = createAsyncThunk(
  'servers/getChannelInfo',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await serverAPI.getChannelInfo(channelId);

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
    currentChannel: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getListJoinedServerAction.pending, (state, action) => {
        showLoadingModal();
      })
      .addCase(getListJoinedServerAction.fulfilled, (state, action) => {
        state.listJoinedServer = action.payload;
        hideLoadingModal();
      })
      .addCase(getListJoinedServerAction.rejected, (state, action) => {
        hideLoadingModal();
      })

      .addCase(createServerAction.pending, (state, action) => {
        showLoadingModal();
      })
      .addCase(createServerAction.fulfilled, (state, action) => {
        state.listJoinedServer.push(action.payload);
        hideLoadingModal();
      })
      .addCase(createServerAction.rejected, (state, action) => {
        hideLoadingModal();
      })

      .addCase(getServerInfoAction.pending, (state, action) => {
        showLoadingModal();
      })
      .addCase(getServerInfoAction.fulfilled, (state, action) => {
        state.currentServer = action.payload;
        hideLoadingModal();
      })
      .addCase(getServerInfoAction.rejected, (state, action) => {
        hideLoadingModal();
      })

      .addCase(getChannelInfoAction.pending, (state, action) => {
        showLoadingModal();
      })
      .addCase(getChannelInfoAction.fulfilled, (state, action) => {
        state.currentChannel = action.payload;
        hideLoadingModal();
      })
      .addCase(getChannelInfoAction.rejected, (state, action) => {
        hideLoadingModal();
      });
  },
});

export const selectListJoinedServer = (state) => state.servers.listJoinedServer,
  selectCurrentServer = (state) => state.servers.currentServer;

export const { setCurrentServer } = serverSlice.actions;
export default serverSlice.reducer;
