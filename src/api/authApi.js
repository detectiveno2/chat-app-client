import axiosClient from './axiosClient';

const authApi = {
  get: () => {
    const url = '/auth';
    return axiosClient.get(url);
  },

  postRegister: (data) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },

  postLogin: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
};

export default authApi;
