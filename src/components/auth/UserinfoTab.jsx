import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import MyArticle from './MyArticle';
import MyComment from './MyComment';
import MyInfo from './MyInfo';
import { selectedTabAtom } from '../../atoms/selectedTabAtom';
import { apiInstanceWithoutToken } from '../../api/apiInstance';

function UserinfoTab() {
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
  const [postDatas, setPostDatas] = useState([]);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // userinfo 가져오기
  const userinfo = JSON.parse(localStorage.getItem('userInfo'));

  // fetch user's articles

  const { nickname } = userinfo;
  const fetchMyArticle = async () => {
    try {
      // 나의 게시글 api 요청
      const response = await apiInstanceWithoutToken.get(
        `/article/search?searchType=author&keyword=${nickname}`
      );
      setPostDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMyArticle();
  }, []);

  // fetch user's comments

  return (
    <div>
      <div className="mb-4 flex h-[4.5rem] items-center justify-end gap-2 rounded-lg bg-white">
        <button
          className={`h-12 rounded-md px-4 ${
            selectedTab === 'article' ? 'bg-yel text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabClick('article')}
        >
          내 게시글
        </button>
        <button
          className={`mr-4 h-12 rounded-md px-4 ${
            selectedTab === 'info' ? 'bg-yel text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabClick('info')}
        >
          내 정보
        </button>
      </div>
      <div>
        {selectedTab === 'article' ? <MyArticle myArticle={postDatas} /> : null}
        {selectedTab === 'info' ? <MyInfo userInfo={userinfo} /> : null}
      </div>
    </div>
  );
}

export default UserinfoTab;
