import { useEffect } from 'react';
import { useAtom } from 'jotai';
import Pagination from '../components/community/Pagination';
import GlobalLayout from '../components/layout/GlobalLayout';
import { apiInstanceWithoutToken } from '../api/apiInstance';
import { selectedBoardIdAtom } from '../atoms/selectBoardId';
import { articlesAtom } from '../atoms/articlesAtom';

function MainPage() {
  const [boardId] = useAtom(selectedBoardIdAtom);
  const [articles, setArticles] = useAtom(articlesAtom);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        await apiInstanceWithoutToken.get('/board/list').then((response) => {
          console.log('게시판 리스트', response.data);
          localStorage.setItem('boardList', JSON.stringify(response.data));
        });
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };
    fetchBoardList();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        await apiInstanceWithoutToken.get(`/article/search?boardId=${boardId}`).then((response) => {
          console.log('게시글 리스트', response.data);
          setArticles(response.data.articles);
        });
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, [boardId]);

  return (
    <GlobalLayout>
      {/* <SideMenu /> */}
      <Pagination postDatas={articles} />
    </GlobalLayout>
  );
}

export default MainPage;
