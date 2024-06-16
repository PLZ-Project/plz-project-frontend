import axios from 'axios';

export const apiInstanceWithoutToken = axios.create(
  {
    baseURL: 'https://www.plz-project.site/api'
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export const apiInstance = axios.create(
  {
    baseURL: 'https://plz-project.site/api',
    withCredentials: false
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

// 로컬스토리지에 저장되어있는 access_token, refresh_token을 가져와서 헤더에 넣어주는 interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      config.headers.access_token = `${accessToken}`;
      config.headers.refresh_token = `${refreshToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // interceptor
// apiInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = Cookies.get('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
