import axiosClient from './axiosClient';

const roomsApi = {
  get: () => {
    const url = '/rooms';
    return axiosClient.get(url);
  },

  getRoom: (id) => {
    const url = `/rooms/${id}`;
    return axiosClient.get(url);
  },

  postCreate: (data) => {
    const url = '/rooms/create';
    return axiosClient.post(url, data);
  },

  postJoin: (data) => {
    const url = '/rooms/join';
    return axiosClient.post(url, data);
  },

  getMemberOnRoom: (id) => {
    const url = `/rooms/${id}/members`;
    return axiosClient.get(url);
  },
};

export default roomsApi;
