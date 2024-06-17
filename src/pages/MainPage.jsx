import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../components/community/Pagination';
import GlobalLayout from '../components/layout/GlobalLayout';
import { apiInstanceWithoutToken } from '../api/apiInstance';

function MainPage() {
  // 메인페이지로 이동하면, 쿠키에 저장된 토큰과 유저정보를 localStorage에 저장한다.
  // 이후, localStorage에 저장된 토큰과 유저정보를 이용하여 로그인 여부를 판단한다.
  // const [articles, setArticles] = useState({});

  const {
    data: boardList,
    isLoading: boardLoading,
    error: boardError
  } = useQuery({
    queryKey: ['boardList'],
    queryFn: async () => {
      const response = await apiInstanceWithoutToken.get('/board/list');
      return response.data;
    }
  });

  const {
    data: communityList,
    isLoading: communityLoading,
    error: communityError
  } = useQuery({
    queryKey: ['communityList'],
    queryFn: async () => {
      const response = await axios.get('/api/community/list');
      return response.data;
    }
  });

  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axios.get('/api/article/search');
      return response.data;
    }
  });

  if (boardLoading || communityLoading || articlesLoading) {
    return <div>Loading...</div>;
  }

  if (boardError || communityError || articlesError) {
    return <div>Error occurred while fetching data.</div>;
  }
  // const fetchBoardList = async () => {
  //   try {
  //     await axios.get('/api/board/list').then((response) => {
  //       console.log('게시판 리스트', response.data);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching board list:', error);
  //   }
  // };
  // const fetchCommunityList = async () => {
  //   try {
  //     await axios.get('/api/community/list').then((response) => {
  //       console.log('커뮤니티 리스트', response.data);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching community list:', error);
  //   }
  // };
  // const fetchArticles = async () => {
  //   try {
  //     await axios.get('/api/article/search').then((response) => {
  //       console.log('게시글 리스트', response.data);
  //       setArticles(response.data);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching articles:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBoardList();
  //   fetchCommunityList();
  //   fetchArticles();
  // }, []);
  return (
    <GlobalLayout>
      {/* <SideMenu /> */}
      <Pagination />
    </GlobalLayout>
  );
}

export default MainPage;
