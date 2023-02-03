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

  createInviteLink: (id, data) => {
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
};

export default serverAPI;
