import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiInstance } from '../api/apiInstance';

const useCommentActions = (id) => {
  const queryClient = useQueryClient();

  const { mutate: commentPost } = useMutation({
    mutationFn: async ({ articleId, content }) => {
      await apiInstance.post('/comment', {
        articleId,
        content
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['commentData', id]);
    },
    onError: (error) => {
      console.error('Error occurred while posting comment:', error);
    }
  });

  const { mutate: commentModify } = useMutation({
    mutationFn: async ({ commentId, content }) => {
      await apiInstance.put(`/comment/${commentId}`, {
        content
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['commentData', id]);
      // handleCommentEditMode();
    },
    onError: (error) => {
      console.error('Error occurred while modifying comment:', error);
    }
  });

  const { mutate: commentDelete } = useMutation({
    mutationFn: async ({ commentId }) => {
      await apiInstance.delete(`/comment/${commentId}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['commentData', id]);
    },
    onError: (error) => {
      console.error('Error occurred while deleting comment:', error);
    }
  });

  return { commentPost, commentModify, commentDelete };
};

export default useCommentActions;
