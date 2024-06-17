import { useLocation } from 'react-router-dom';
import GlobalLayout from '../components/layout/GlobalLayout';
import SideMenu from '../components/community/SideMenu';
import PostArticleForm from '../components/community/PostArticleForm';

function PostModifyPage() {
  const { state } = useLocation();
  const { isEditing, postData } = state;
  return (
    <GlobalLayout>
      <PostArticleForm isEditing={isEditing} postData={postData} />
    </GlobalLayout>
  );
}

export default PostModifyPage;
