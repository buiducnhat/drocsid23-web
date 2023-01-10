import Cookies from 'js-cookie';

import { axiosMethod, axiosRequest } from 'src/helpers/axios.helper';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const authenEndPoint = API_ENDPOINT + '/authen';

const authenAPI = {
  login: (data) => {
    return axiosRequest(
      authenEndPoint + '/users/login',
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

  getInfor: () => {
    return axiosRequest(
      authenEndPoint + '/user-info',
      axiosMethod.GET,
      Cookies.get('accessToken')
    );
  },
};

export default authenAPI;
