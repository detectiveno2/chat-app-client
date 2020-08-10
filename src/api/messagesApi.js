import axiosClient from './axiosClient';

const messagesApi = {
  get: () => {
    const url = '/messages';
    return axiosClient.get(url);
  },

  getMessages: (id) => {
    const url = `/messages/${id}`;
    return axiosClient.get(url);
  },

  sendMessages: (content) => {
    const url = '/messages/sendMessages';
    return axiosClient.post(url, content);
  },
};

export default messagesApi;
