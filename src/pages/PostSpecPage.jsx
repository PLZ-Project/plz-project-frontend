import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostSpecSection from '../components/community/PostSpecSection';
import GlobalLayout from '../components/layout/GlobalLayout';
import { apiInstanceWithoutToken } from '../api/apiInstance';

function PostSpecPage() {
  const { id } = useParams();

  const {
    data: postData,
    isLoading: postLoading,
    error: postError
  } = useQuery({
    queryKey: ['postData', id],
    queryFn: async () => {
      const response = await apiInstanceWithoutToken.get(`/article/${id}`);
      return response.data;
    }
  });

  if (postLoading) {
    return <div>Loading...</div>;
  }

  if (postError) {
    return <div>Error occurred while fetching post data.</div>;
  }

  return (
    <GlobalLayout>
      <PostSpecSection id={id} />
    </GlobalLayout>
  );
}

export default PostSpecPage;
