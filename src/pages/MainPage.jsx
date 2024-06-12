import Pagination from '../components/community/Pagination';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function MainPage() {
  return (
    <GlobalLayout>
      <SideMenu />
      <Pagination />
    </GlobalLayout>
  );
}

export default MainPage;
