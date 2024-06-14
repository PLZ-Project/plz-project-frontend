import axios from 'axios';
import { Cookies } from 'react-cookie';

export const apiInstanceWithoutToken = axios.create(
  {
    baseURL: 'https://www.plz-project.site/api',
    withCredentials: true
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export const apiInstance = axios.create({
  baseURL: 'https://plz-project.site/api'
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
