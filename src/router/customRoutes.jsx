import { Cookies } from 'react-cookie';
import { Link, Navigate } from 'react-router-dom';

function getAccessToken() {
  const cookie = document.cookie.split(';').find((c) => c.trim().startsWith('access_token='));
  if (cookie) {
    return cookie.split('=')[1];
  }
  return null;
}

function AuthRoute({ children }) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    alert('유효하지 않은 접근입니다.');
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AuthRoute;
