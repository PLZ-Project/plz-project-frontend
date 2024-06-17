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
      <div className="bg-banner2 w-svw h-svh bg-cover flex items-center">
        <div className='ml-[13rem]'>
          <span className='font-BlackHanSans text-orange-600 text-7xl'>PlayerZ</span>
          <span className='font-NotoSansKR text-white mt-4'>플레이어즈는 게임을 좋아하는 사람들을 위해 존재하는 커뮤니티입니다.</span>
          <span className='font-NotoSansKR text-white mt-1'>사람들과 소통하며 게임의 즐거움을 더욱 누려보세요!!</span>
        </div>
      </div>
  );
}

export default LandingPage;
