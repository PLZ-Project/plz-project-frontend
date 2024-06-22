import axios from 'axios';

export const apiInstanceWithoutToken = axios.create(
  {
    baseURL: '/api'
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export const apiInstance = axios.create({
  baseURL: '/api',
  withCredentials: false, // 인증 정보(쿠키 등)을 요청에 포함할지 여부
  headers: {
    'Content-Type': 'application/json' // 요청 헤더 설정
  }
});

// 로컬스토리지에 저장되어있는 access_token, refresh_token을 가져와서 헤더에 넣어주는 interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      config.headers.accesstoken = `${accessToken}`;
      config.headers.refreshtoken = `${refreshToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰이 필요한 요청을 보낼 때, 만약 액세스 토큰이나 리프레시 토큰이 만료되었다면, 서버에서 만료된 토큰을 새롭게 발급해서 보내준다.
// 따라서, 새롭게 발급받은 토큰을 localStorage에 있는 토큰과 교체해주는 interceptor
apiInstance.interceptors.response.use((response) => {
  // 기본적으로 만료된 토큰을 보내도, 에러는 발생하지 않는다.
  // 대신 새롭게 발급된 액세스 토큰 혹은 리프레시 토큰이 온다.
  // 따라서, 로컬 스토리지에 저장된 토큰과 비교 후, 다르면 교체해준다.
  if (response.headers.accesstoken) {
    const accessToken = response.headers.accesstoken;
    const refreshToken = response.headers.refreshtoken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
});

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
