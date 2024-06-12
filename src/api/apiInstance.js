import axios from 'axios';
import { Cookies } from 'react-cookie';

export const apiInstanceWithoutToken = axios.create(
  {
    baseURL: 'http://ec2-3-34-2-18.ap-northeast-2.compute.amazonaws.com/api'
  },
  {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export const apiInstance = axios.create({
  baseURL: 'http://ec2-3-34-2-18.ap-northeast-2.compute.amazonaws.com/api'
});

// interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
