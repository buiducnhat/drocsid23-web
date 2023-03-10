import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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

export const updateServerAction = createAsyncThunk(
  'servers/updateServer',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.updateServer(id, data);

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

export const createChannelAction = createAsyncThunk(
  'servers/createChannel',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serverAPI.createChannel(data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const updateChannelAction = createAsyncThunk(
  'servers/updateChannel',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.updateChannel(id, data);

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
  reducers: {
    addMessageToCurrentChannel: (state, action) => {
      if (action.payload.channelId === state.currentChannel._id) {
        state.currentChannel.messages = [
          ...state.currentChannel.messages,
          action.payload,
        ];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getListJoinedServerAction.pending, () => {
        showLoadingModal();
      })
      .addCase(getListJoinedServerAction.fulfilled, (state, action) => {
        state.listJoinedServer = action.payload;
        hideLoadingModal();
      })
      .addCase(getListJoinedServerAction.rejected, () => {
        hideLoadingModal();
      })

      .addCase(createServerAction.pending, () => {
        showLoadingModal();
      })
      .addCase(createServerAction.fulfilled, (state, action) => {
        state.listJoinedServer.push(action.payload);
        hideLoadingModal();
        toast.success('Create server successfully');
      })
      .addCase(createServerAction.rejected, () => {
        hideLoadingModal();
        toast.error('Create server failed');
      })

      .addCase(updateServerAction.pending, () => {
        showLoadingModal();
      })
      .addCase(updateServerAction.fulfilled, (state, action) => {
        state.listJoinedServer = state.listJoinedServer.map((server) =>
          server._id === action.payload._id ? action.payload : server
        );

        hideLoadingModal();
        toast.success('Update server successfully');
      })
      .addCase(updateServerAction.rejected, () => {
        hideLoadingModal();
        toast.error('Update server failed');
      })

      .addCase(getServerInfoAction.pending, () => {
        showLoadingModal();
      })
      .addCase(getServerInfoAction.fulfilled, (state, action) => {
        state.currentServer = action.payload;
        hideLoadingModal();
      })
      .addCase(getServerInfoAction.rejected, () => {
        hideLoadingModal();
      })

      .addCase(getChannelInfoAction.pending, () => {
        showLoadingModal();
      })
      .addCase(getChannelInfoAction.fulfilled, (state, action) => {
        state.currentChannel = action.payload;
        hideLoadingModal();
      })
      .addCase(getChannelInfoAction.rejected, () => {
        hideLoadingModal();
      })

      .addCase(createChannelAction.pending, () => {
        showLoadingModal();
      })
      .addCase(createChannelAction.fulfilled, (state, action) => {
        state.currentServer.channels.push(action.payload);
        hideLoadingModal();
        toast.success('Create channel successfully');
      })
      .addCase(createChannelAction.rejected, () => {
        hideLoadingModal();
        toast.error('Create channel failed');
      })

      .addCase(updateChannelAction.pending, () => {
        showLoadingModal();
      })
      .addCase(updateChannelAction.fulfilled, (state, action) => {
        state.currentServer.channels = state.currentServer.channels.map(
          (channel) =>
            channel._id === action.payload._id ? action.payload : channel
        );

        hideLoadingModal();
        toast.success('Update channel successfully');
      })
      .addCase(updateChannelAction.rejected, () => {
        hideLoadingModal();
        toast.error('Update channel failed');
      });
  },
});

export const selectListJoinedServer = (state) => state.servers.listJoinedServer,
  selectCurrentServer = (state) => state.servers.currentServer;

export const { setCurrentServer, addMessageToCurrentChannel } =
  serverSlice.actions;
export default serverSlice.reducer;
