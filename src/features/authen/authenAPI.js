import Cookies from 'js-cookie';

import { axiosMethod, axiosRequest } from 'src/helpers/axios.helper';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const authenEndPoint = API_ENDPOINT + '/users';

const authenAPI = {
  login: (data) => {
    return axiosRequest(
      authenEndPoint + '/login',
      axiosMethod.POST,
      null,
      null,
      data
    );
  },

  register: (data) => {
    return axiosRequest(
      authenEndPoint + '/signup',
      axiosMethod.POST,
      null,
      null,
      data
    );
  },

  getMe: () => {
    return axiosRequest(
      authenEndPoint + '/',
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },
};

export default authenAPI;
