import { useEffect } from 'react';
import { apiInstanceWithoutToken } from '../api/apiInstance';
import UserinfoTab from '../components/auth/UserinfoTab';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function UserinfoPage() {
  return (
    <GlobalLayout>
      <UserinfoTab />
    </GlobalLayout>
  );
}

export default UserinfoPage;
