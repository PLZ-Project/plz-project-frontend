import { useCookies } from 'react-cookie';
import Pagination from '../components/community/Pagination';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function MainPage() {
  // 메인페이지로 이동하면, 쿠키에 저장된 토큰과 유저정보를 localStorage에 저장한다.
  // 이후, localStorage에 저장된 토큰과 유저정보를 이용하여 로그인 여부를 판단한다.

  const [cookie] = useCookies(['accessToken', 'refreshToken', 'userInfo']);
  console.log(cookie);
  console.log(document.cookie);

  return (
    <GlobalLayout>
      <SideMenu />
      <Pagination />
    </GlobalLayout>
  );
}

export default MainPage;
