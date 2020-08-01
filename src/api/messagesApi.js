import axiosClient from './axiosClient';

const messagesApi = {
  get: () => {
    const url = '/messages';
    return axiosClient.get(url);
  },
};

export default messagesApi;
