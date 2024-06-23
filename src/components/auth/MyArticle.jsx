import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MyArticle({ myArticle }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (myArticle && myArticle.articles && myArticle.articles.rows) {
      setPostData(myArticle.articles.rows);
      setIsLoading(false);
    }
  }, [myArticle]);

  return (
    <div className="flex h-[30rem] w-[52rem] flex-row rounded-lg bg-white">
      <div className="flex w-[7.5rem] items-center justify-center">나의 게시글</div>
      <div className="flex flex-col gap-0 border-l-2 border-placeholderGray px-4">
        {/* 나의 게시글 api 요청 후, 그 결과에 따라 map으로 반복문 진행. */}
        {isLoading ? (
          <div className="flex h-10 w-[42.5rem] items-center justify-center">Loading...</div>
        ) : (
          postData.map((post, idx) => (
            <div
              key={idx}
              className="mt-4 flex h-12 w-[42.5rem] flex-row items-center justify-between rounded-md  px-4 shadow-md shadow-gray-400"
            >
              <div>
                <button onClick={() => navigate(`/post/${post.id}`)}>{post.title}</button>
              </div>
              <div className="flex flex-row gap-2">
                <button
                  className="h-7 w-14 rounded-md bg-yel-600 text-white"
                  aria-label="modify button"
                  onClick={() =>
                    navigate(`/post/modify/${post.id}`, {
                      state: { isEditing: true, postData: post }
                    })
                  }
                >
                  수정
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyArticle;
