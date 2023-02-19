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

export const deleteServerAction = createAsyncThunk(
  'servers/deleteServer',
  async (serverId, { rejectWithValue }) => {
    try {
      const response = await serverAPI.deleteServer(serverId);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const updateRoleAction = createAsyncThunk(
  'servers/updateRole',
  async ({ serverId, roleId, data }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.updateRole(serverId, roleId, data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const createRoleAction = createAsyncThunk(
  'servers/createRole',
  async ({ serverId, data }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.createRole(serverId, data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const deleteRoleAction = createAsyncThunk(
  'servers/deleteRole',
  async ({ serverId, roleId }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.deleteRole(serverId, roleId);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const addUserToRoleAction = createAsyncThunk(
  'servers/addUserToRole',
  async ({ serverId, roleId, userId }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.addUserToRole(serverId, roleId, {
        userId,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const removeUserFromRoleAction = createAsyncThunk(
  'servers/removeUserFromRole',
  async ({ serverId, roleId, userId }, { rejectWithValue }) => {
    try {
      const response = await serverAPI.removeUserFromRole(serverId, roleId, {
        userId,
      });

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
      })

      .addCase(deleteServerAction.pending, () => {
        showLoadingModal();
      })
      .addCase(deleteServerAction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.listJoinedServer = state.listJoinedServer.filter(
          (server) => server._id !== action.payload
        );

        hideLoadingModal();
        toast.success('Delete server successfully');
      })
      .addCase(deleteServerAction.rejected, () => {
        hideLoadingModal();
        toast.error('Delete server failed');
      })

      .addCase(updateRoleAction.pending, () => {
        showLoadingModal();
      })
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        state.currentServer.roles = state.currentServer.roles.map((role) =>
          role._id === action.payload._id
            ? {
                ...role,
                rolePolicies: action.payload.rolePolicies,
              }
            : role
        );

        hideLoadingModal();
        toast.success('Update role successfully');
      })
      .addCase(updateRoleAction.rejected, () => {
        hideLoadingModal();
        toast.error('Update role failed');
      })

      .addCase(createRoleAction.pending, () => {
        showLoadingModal();
      })
      .addCase(createRoleAction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.currentServer.roles = [
          ...state.currentServer.roles,
          { ...action.payload, users: [] },
        ];

        hideLoadingModal();
        toast.success('Create role successfully');
      })
      .addCase(createRoleAction.rejected, () => {
        hideLoadingModal();
        toast.error('Create role failed');
      })

      .addCase(deleteRoleAction.pending, () => {
        showLoadingModal();
      })
      .addCase(deleteRoleAction.fulfilled, (state, action) => {
        state.currentServer.roles = state.currentServer.roles.filter(
          (role) => role._id !== action.payload._id
        );

        hideLoadingModal();
        toast.success('Delete role successfully');
      })
      .addCase(deleteRoleAction.rejected, () => {
        hideLoadingModal();
        toast.error('Delete role failed');
      })

      .addCase(addUserToRoleAction.pending, () => {
        showLoadingModal();
      })
      .addCase(addUserToRoleAction.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.currentServer.roles = state.currentServer.roles.map((role) =>
        //   role._id === action.payload._id
        //     ? {
        //         ...role,
        //         users: [...role.users, action.payload.user],
        //       }
        //     : role
        // );

        hideLoadingModal();
        toast.success('Add user to role successfully');
      })
      .addCase(addUserToRoleAction.rejected, () => {
        hideLoadingModal();
        toast.error('Add user to role failed');
      })

      .addCase(removeUserFromRoleAction.pending, () => {
        showLoadingModal();
      })
      .addCase(removeUserFromRoleAction.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.currentServer.roles = state.currentServer.roles.map((role) =>
        //   role._id === action.payload._id
        //     ? {
        //         ...role,
        //         users: role.users.filter(
        //           (user) => user._id !== action.payload.user._id
        //         ),
        //       }
        //     : role
        // );

        hideLoadingModal();
        toast.success('Remove user from role successfully');
      })
      .addCase(removeUserFromRoleAction.rejected, () => {
        hideLoadingModal();
        toast.error('Remove user from role failed');
      });
  },
});

export const selectListJoinedServer = (state) => state.servers.listJoinedServer,
  selectCurrentServer = (state) => state.servers.currentServer;

export const { setCurrentServer, addMessageToCurrentChannel } =
  serverSlice.actions;
export default serverSlice.reducer;
