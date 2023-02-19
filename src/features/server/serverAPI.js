import Cookies from 'js-cookie';

import { axiosMethod, axiosRequest } from 'src/helpers/axios.helper';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const serverEndPoint = API_ENDPOINT + '/servers';
const channelEndPoint = API_ENDPOINT + '/channels';

const serverAPI = {
  getJoinedServers: () => {
    return axiosRequest(
      serverEndPoint + '/get-servers-join-user',
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },

  createServer: (data) => {
    return axiosRequest(
      serverEndPoint + '/',
      axiosMethod.POST,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  getServerInfo: (id) => {
    return axiosRequest(
      serverEndPoint + `/${id}`,
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },

  updateServer: (id, data) => {
    return axiosRequest(
      serverEndPoint + `/${id}`,
      axiosMethod.PUT,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  createInvitationCode: (id, data) => {
    return axiosRequest(
      serverEndPoint + `/create-invite/${id}`,
      axiosMethod.POST,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  responseRequest: (id, data) => {
    return axiosRequest(
      serverEndPoint + `/response-user-request/${id}`,
      axiosMethod.POST,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  getChannelsOfServer(serverId) {
    return axiosRequest(
      channelEndPoint + `/getall/${serverId}`,
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },

  getChannelInfo(channelId) {
    return axiosRequest(
      channelEndPoint + `/${channelId}`,
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },

  createChannel(data) {
    return axiosRequest(
      channelEndPoint + `/`,
      axiosMethod.POST,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  updateChannel(channelId, data) {
    return axiosRequest(
      channelEndPoint + `/${channelId}`,
      axiosMethod.PUT,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  createServerInviteCode: (id, data) => {
    return axiosRequest(
      serverEndPoint + `/create-invite/${id}`,
      axiosMethod.POST,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  joinServerWithCode: (code) => {
    return axiosRequest(
      `${API_ENDPOINT}/users/invite/${code}`,
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },

  deleteServer: (id) => {
    return axiosRequest(
      serverEndPoint + `/${id}`,
      axiosMethod.DELETE,
      Cookies.get('accessToken')
    );
  },

  updateRole: (serverId, roleId, data) => {
    return axiosRequest(
      `${API_ENDPOINT}/servers/${serverId}/roles/${roleId}`,
      axiosMethod.PUT,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  createRole: (serverId, data) => {
    return axiosRequest(
      `${API_ENDPOINT}/servers/${serverId}/roles`,
      axiosMethod.POST,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  deleteRole: (serverId, roleId) => {
    return axiosRequest(
      `${API_ENDPOINT}/servers/${serverId}/roles/${roleId}`,
      axiosMethod.DELETE,
      Cookies.get('accessToken')
    );
  },

  addUserToRole: (serverId, roleId, data) => {
    return axiosRequest(
      `${API_ENDPOINT}/servers/${serverId}/user-role/${roleId}`,
      axiosMethod.PUT,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  removeUserFromRole: (serverId, roleId, data) => {
    return axiosRequest(
      `${API_ENDPOINT}/servers/${serverId}/user-role/${roleId}/${data.userId}`,
      axiosMethod.DELETE,
      Cookies.get('accessToken'),
      null,
      data
    );
  },

  removeUserFromServer: (serverId, data) => {
    return axiosRequest(
      `${API_ENDPOINT}/servers/${serverId}/kick-user`,
      axiosMethod.PUT,
      Cookies.get('accessToken'),
      null,
      data
    );
  }
};

export default serverAPI;
