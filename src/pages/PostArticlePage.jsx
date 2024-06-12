import PostArticleForm from '../components/community/PostArticleForm';
import SideMenu from '../components/community/SideMenu';
import GlobalLayout from '../components/layout/GlobalLayout';

function PostArticlePage() {
  return (
    <GlobalLayout>
      <SideMenu />
      <PostArticleForm isEditing={false} postData={null} />
    </GlobalLayout>
  );
}

export default PostArticlePage;
