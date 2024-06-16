import Logo from '@assets/logo.svg?react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isLoginAtom } from '../../atoms/isLoginAtom';
import AlertDropdown from '../modal/AlertDropdown';
import axios from 'axios';

function Header() {
  // 헤더의 위치는 상단에 고정되어 있어야 한다.
  // 헤더의 내부는 flex 로 정렬되면, 좌측에는 로고가 들어간다.
  // 우측에는 로그인 상태에 따라, 로그인 버튼 또는 로그아웃 버튼이 들어간다.
  // 로그인 시, 알림 버튼이 추가로 들어간다.

  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdownClick = (e) => {
    console.log('toggleDropdownClick', isDropdownVisible);
    e.stopPropagation(); // 이벤트 전파 중지
    setIsDropdownVisible((prev) => !prev);
  };

  const [isLogin, setIsLogin] = useAtom(isLoginAtom);

  const goToMain = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout', {
        headers: {
          access_token: localStorage.getItem('accessToken'),
          refresh_token: localStorage.getItem('refreshToken')
        }
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userInfo');
      goToMain();
    } catch (error) {
      console.error('Error logging out:', error);
    }

    setIsLogin(false);
  };

  return (
    <header className="sticky z-50 flex h-[72px] w-full flex-row justify-between bg-white px-8">
      <button id="logo" onClick={goToMain} aria-label="main button">
        <Logo width={72} height={72} />
      </button>
      <div id="menu" className="flex flex-row gap-8">
        {/* 로그인 여부에 따라 조건부 렌더링 */}
        {/* 로그인 되어있을 때 */}
        {isLogin ? (
          <>
            <button onClick={toggleDropdownClick} aria-label="alert button">
              알림
            </button>
            <button onClick={handleLogout} aria-label="logout button">
              로그아웃
            </button>
          </>
        ) : (
          <button onClick={goToLogin} aria-label="login button">
            로그인
          </button>
        )}
      </div>
      {isDropdownVisible && <AlertDropdown toggleDropdown={toggleDropdownClick} />}
    </header>
  );
}

export default Header;
