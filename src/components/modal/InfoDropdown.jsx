import { info } from 'autoprefixer';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoginAtom } from '../../atoms/isLoginAtom';
import axios from 'axios';

function InfoDropdown({ infoToggle }) {
  const infoDropdownRef = useRef(null);
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/userinfo');
    infoToggle();
  };
  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        infoToggle();
      }
    };

    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [infoDropdownRef, infoToggle]);

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
      // 토클 끄기
      infoToggle();
      goToMain();
    } catch (error) {
      console.error('Error logging out:', error);
    }

    setIsLogin(false);
  };

  return (
    <div
      ref={infoDropdownRef}
      className="absolute right-2 top-20 z-[100] flex h-[4rem] w-40 flex-col bg-white"
    >
      <button
        onClick={goToMyPage}
        aria-label="userinfo button"
        className="m-1 h-[2rem] hover:bg-mainBlue-300"
      >
        내 정보
      </button>
      <button
        onClick={handleLogout}
        aria-label="logout button"
        className="m-1 h-[2rem] hover:bg-mainBlue-300"
      >
        로그아웃
      </button>
    </div>
  );
}

export default InfoDropdown;
