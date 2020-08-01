import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  const storageKey = 'jwtToken';
  const token = localStorage.getItem(storageKey);

  config.headers['authorization'] = token;

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    const { status } = err.response;
    if (status === 400) {
      throw err.response.data;
    }

    if (status === 401 || status === 403) {
      const storageKey = 'jwtToken';
      localStorage.removeItem(storageKey);
      throw err;
    }
  }
);

export default axiosClient;
