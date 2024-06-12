import UserinfoTab from '../components/auth/UserinfoTab';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function UserinfoPage() {
  return (
    <GlobalLayout>
      <SideMenu />
      <UserinfoTab />
    </GlobalLayout>
  );
}

export default UserinfoPage;
