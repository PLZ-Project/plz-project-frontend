import { useParams } from 'react-router-dom';
import PostSpecSection from '../components/community/PostSpecSection';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function PostSpecPage() {
  let id = useParams();
  return (
    <GlobalLayout>
      <SideMenu />
      <PostSpecSection id={id} />
    </GlobalLayout>
  );
}

export default PostSpecPage;
