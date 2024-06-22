import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiInstance, apiInstanceWithoutToken } from '../../api/apiInstance';

function MyArticle(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userinfo } = props;
  const articleList = queryClient.getQueryData(['articles']);

  const deleteArticle = useMutation({
    mutationFn: async (articleId) => {
      await apiInstance.delete(`/article/${articleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
    },
    onError: (err) => {
      console.error('Error deleting article:', err);
    }
  });

  const fetchArticle = useMutation({
    mutationFn: async () => {
      const response = await apiInstanceWithoutToken.get(
        `/article/search?searchType=author&keyword=${userinfo.nickname}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['articles'], data);
    },
    onError: (err) => {
      console.error('Error fetching articles:', err);
    }
  });

  const handleEditClick = (postData) => {
    navigate('/post/modify/:id', { state: { isEditing: true, postData } });
  };

  const handleDeleteClick = (articleId) => {
    deleteArticle.mutate(articleId);
  };

  useEffect(() => {
    if (userinfo) {
      fetchArticle.mutate();
    }
  }, [userinfo, queryClient]);

  return (
    <div className="flex h-[30rem] w-[52rem] flex-row rounded-lg bg-white">
      <div className="flex w-[7.5rem] items-center justify-center">나의 게시글</div>
      <div className="flex flex-col gap-0 border-l-2 border-placeholderGray px-4">
        {/* 나의 게시글 api 요청 후, 그 결과에 따라 map으로 반복문 진행. */}
        {articleList && articleList.articles ? (
          articleList.articles.rows.map((article) => (
            <div
              key={article.id}
              className="flex h-10 w-[42.5rem] flex-row items-center justify-between border border-b-placeholderGray"
            >
              <div>{article.title}</div>
              <div className="flex flex-row gap-2">
                <button
                  className="h-7 w-14 rounded-md bg-mainBlue text-white"
                  aria-label="modify button"
                  onClick={() => handleEditClick(article)}
                >
                  수정
                </button>
                <button
                  className="h-7 w-14 rounded-md bg-red-500 text-white"
                  aria-label="delete button"
                  onClick={() => handleDeleteClick(article.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>작성한 게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default MyArticle;
