import { useState } from 'react';
import MyArticle from './MyArticle';
import MyComment from './MyComment';
import MyInfo from './MyInfo';

function UserinfoTab() {
  const [selectedTab, setSelectedTab] = useState('article');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="mb-2 flex h-[4.5rem] justify-end gap-2 rounded-md bg-white">
        <button
          className={`mt-4 rounded-t-md px-4 py-2 ${
            selectedTab === 'article' ? 'bg-mainBlue text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabClick('article')}
        >
          내 게시글
        </button>
        <button
          className={`mt-4 rounded-t-md px-4 py-2 ${
            selectedTab === 'comment' ? 'bg-mainBlue text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabClick('comment')}
        >
          내 댓글
        </button>
        <button
          className={`mr-4 mt-4 rounded-t-md px-4 py-2 ${
            selectedTab === 'info' ? 'bg-mainBlue text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => handleTabClick('info')}
        >
          내 정보
        </button>
      </div>
      <div>
        {selectedTab === 'article' ? <MyArticle /> : null}
        {selectedTab === 'comment' ? <MyComment /> : null}
        {selectedTab === 'info' ? <MyInfo /> : null}
      </div>
    </div>
  );
}

export default UserinfoTab;
