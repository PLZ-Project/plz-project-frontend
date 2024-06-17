import Logo from '@assets/logo.svg?react';
import { useCookies } from 'react-cookie';
import Pagination from '../components/community/Pagination';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function LandingPage() {
  // 메인페이지로 이동하면, 쿠키에 저장된 토큰과 유저정보를 localStorage에 저장한다.
  // 이후, localStorage에 저장된 토큰과 유저정보를 이용하여 로그인 여부를 판단한다.

  const [cookie] = useCookies(['accessToken', 'refreshToken', 'userInfo']);
  console.log(cookie);
  console.log(document.cookie);

  return (
    <div className="bg-banner w-svw h-svh bg-cover bg-left flex items-center">
      <div className="ml-48 flex flex-col justify-center -mt-4">
        <div className="flex flex-col items-start">
          <div style={{ borderRadius: '10rem', backgroundColor: '#4d0101', width: '5rem', height: '5rem', position: 'absolute', left: '10rem', top: '20rem' }}></div>
          <span className="font-BlackHanSans text-white text-7xl opacity-80 z-10 mt-12 mb-[0.4rem] ml-2">PlayerZ</span>
          <span className="font-NotoSansKR text-black mt-4 text-[1.1rem] bg-white bg-opacity-70 px-5 py-2 rounded-xl">플레이어즈는 게임을 좋아하는 사람들을 위해 존재하는 커뮤니티입니다.</span>
          <span className="font-NotoSansKR text-black text-[1.1rem] bg-white bg-opacity-70 mt-3 px-5 py-2 rounded-xl">사람들과 소통하며 게임의 즐거움을 더욱 누려보세요!!</span>
        </div>
        <div className="flex mt-5 h-[4.1rem]">
          <span className="font-NotoSansKR text-[1.1rem] text-white w-[50%] text-center bg-opacity-60 bg-blue-950 pt-5 pb-[1.45rem] px-4 rounded-xl">로그인을 하시겠어요?</span>
          <span className="font-NotoSansKR text-[1.1rem] text-white w-[16.2rem] ml-3 w-[50%] text-center bg-opacity-60 bg-blue-950 pt-5 pb-[1.45rem] px-4 rounded-xl">메인 페이지로 이동합니다.</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
