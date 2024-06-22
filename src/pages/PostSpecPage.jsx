import { useParams } from 'react-router-dom';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import PostSpecSection from '../components/community/PostSpecSection';
import GlobalLayout from '../components/layout/GlobalLayout';
import { apiInstanceWithoutToken } from '../api/apiInstance';

function PostSpecPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
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

  const incrementViewCount = async (id) => {
    console.log('incrementViewCount', '실행');
    await apiInstanceWithoutToken.put(`/article/modifyHit/${id}`);
  };

  const { mutate: incrementViewCountMutate } = useMutation({
    mutationFn: incrementViewCount,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['postData', id]);
    }
  });

  useEffect(() => {
    if (postData) {
      incrementViewCountMutate(id);
    }
  }, [id]);

  const {
    data: commentData,
    isLoading: commentLoading,
    error: commentError
  } = useQuery({
    queryKey: ['commentData', id],
    queryFn: async () => {
      const response = await apiInstanceWithoutToken.get(`/comment/list/${id}`);
      return response.data;
    }
  });

  if (postLoading || commentLoading) {
    return <div>Loading...</div>;
  }

  if (postError || commentError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <GlobalLayout>
      <PostSpecSection id={id} />
    </GlobalLayout>
  );
}

export default PostSpecPage;
