import { Navigate } from 'react-router-dom';

function getAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
}

// 로그인이 되어 있지 않으면 접근 불가능한 페이지
function AuthRoute({ children }) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    alert('유효하지 않은 접근입니다.');
    return <Navigate to="/" replace />;
  }
  return children;
}

// 토큰이 있는 상태론 접근 불가능한 페이지
function NonAuthRoute({ children }) {
  const accessToken = getAccessToken();
  if (accessToken) {
    alert('이미 로그인한 상태입니다.');
    return <Navigate to="/main" replace />;
  }
  return children;
}

export { AuthRoute, NonAuthRoute };
