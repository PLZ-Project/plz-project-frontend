import Logo from '@assets/logo.svg?react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isLoginAtom } from '../../atoms/isLoginAtom';
import AlertDropdown from '../modal/AlertDropdown';
import InfoDropdown from '../modal/InfoDropdown';

function Header() {
  // 헤더의 위치는 상단에 고정되어 있어야 한다.
  // 헤더의 내부는 flex 로 정렬되면, 좌측에는 로고가 들어간다.
  // 우측에는 로그인 상태에 따라, 로그인 버튼 또는 로그아웃 버튼이 들어간다.
  // 로그인 시, 알림 버튼이 추가로 들어간다.

  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isInfoDropdownVisible, setIsInfoDropdownVisible] = useState(false);

  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let nickname = '';

  if (isLogin && userInfo !== null) {
    nickname = userInfo.nickname;
  }

  const toggleDropdownClick = (e) => {
    console.log('toggleDropdownClick', isDropdownVisible);
    e.stopPropagation(); // 이벤트 전파 중지
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleInfoDropdownClick = (e) => {
    console.log('toggleInfoDropdownClick', isInfoDropdownVisible);
    e.stopPropagation(); // 이벤트 전파 중지
    setIsInfoDropdownVisible((prev) => !prev);
  };

  // const isLogin = useAtom(isLoginAtom);

  const goToMain = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const userNickName = () => {
    const regex = /^(.*shibaDog\d{0,4}).*/;
    const match = nickname.match(regex);
    const name = match ? match[1] : nickname.replace(/^\d{0,4}/, '').slice(0, 12);
    return name;
  };

  return (
    <header className="fixed z-50 flex h-[72px] w-full flex-row justify-between bg-white px-8">
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
            <p className="flex items-center gap-2">
              <button
                onClick={toggleInfoDropdownClick}
                aria-label="logout button"
                className="my-2 rounded-md px-2 hover:bg-gray-200"
              >
                <span className="text-[#af8430]">{userNickName()}</span>
              </button>
              님 안녕하세요.
            </p>
          </>
        ) : (
          <button onClick={goToLogin} aria-label="login button">
            로그인
          </button>
        )}
      </div>
      {isDropdownVisible && <AlertDropdown toggleDropdown={toggleDropdownClick} />}
      {isInfoDropdownVisible && <InfoDropdown infoToggle={toggleInfoDropdownClick} />}
    </header>
  );
}

export default Header;
