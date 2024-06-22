import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../components/community/Pagination';
import GlobalLayout from '../components/layout/GlobalLayout';
import { apiInstanceWithoutToken } from '../api/apiInstance';
import { selectedBoardIdAtom } from '../atoms/selectBoardId';
import { articlesAtom } from '../atoms/articlesAtom';

function MainPage() {
  const [boardId] = useAtom(selectedBoardIdAtom);
  // const [articles, setArticles] = useAtom(articlesAtom);
  // console.log('게시판 아이디', boardId);

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //   await apiInstanceWithoutToken.get(`/article/search?boardId=${boardId}`).then((response) => {
  //         console.log('게시글 리스트', response.data);
  //         setArticles(response.data.articles);
  //       });
  //     } catch (error) {
  //       console.error('Error fetching articles:', error);
  //     }
  //   };
  //   fetchArticles();
  // }, [boardId]);

  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError
  } = useQuery({
    queryKey: ['articles', boardId],
    queryFn: async () => {
      const response = await apiInstanceWithoutToken.get(`/article/search?boardId=${boardId}`);
      return response.data;
    }
  });

  if (articlesLoading) {
    return <div>Loading...</div>;
  }

  if (articlesError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <GlobalLayout>
      <Pagination postDatas={articles} />
    </GlobalLayout>
  );
}

export default MainPage;
