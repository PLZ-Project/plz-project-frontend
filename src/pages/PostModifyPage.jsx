import { useLocation } from 'react-router-dom';
import PostArticleForm from '../components/community/PostArticleForm';
import GlobalLayout from '../components/layout/GlobalLayout';

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
