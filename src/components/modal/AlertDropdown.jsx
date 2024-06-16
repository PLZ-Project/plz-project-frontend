import { useEffect, useRef } from 'react';

function AlertDropdown({ toggleDropdown }) {
  // 헤더의 알림 버튼을 누르면 알림 목록과 채팅 목록을 보여준다.
  // 드롭다운 메뉴의 구성은 flex-col로 위에는 알림 목록, 아래는 채팅 목록을 보여준다.
  // 각각의 목록은 위아래 스크롤이 가능하지만, 스크롤바는 보이지 않는다.
  // 헤더를 기준으로 포지션은 absolute이다.
  // 이 컴포넌트의 크기는 가로 * 세로 => 20rem * 30rem이다.
  const dropdownRef = useRef(null);
  console.log('dropdownRef', dropdownRef);
  // 바깥을 클릭하면 드롭다운 메뉴가 사라진다.
  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        toggleDropdown();
      }
    };

    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [dropdownRef, toggleDropdown]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-2 top-20 z-[100] flex h-[30rem] w-80 flex-col bg-black bg-opacity-50"
    >
      <div id="alertList" className="h-60 overflow-hidden text-white">
        알림 컴포넌트가 들어갈 자리.
      </div>
      <div id="chattingList" className="h-60 overflow-hidden text-white">
        채팅 컴포넌트가 들어갈 자리.
      </div>
    </div>
  );
}

export default AlertDropdown;
