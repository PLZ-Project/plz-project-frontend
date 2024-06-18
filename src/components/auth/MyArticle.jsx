import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../../api/apiInstance';

function MyArticle() {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/post/:id', { state: { isEditing: true, postData } });
  };

  const fetchMyArticle = async () => {
    // 나의 게시글 api 요청
    const response = await apiInstance.get('/mypost');
  };

  const handleDeleteClick = () => {
    // 삭제 api 요청
  };

  return (
    <div className="flex h-[30rem] w-[52rem] flex-row rounded-lg bg-white">
      <div className="flex w-[7.5rem] items-center justify-center">나의 게시글</div>
      <div className="flex flex-col gap-0 border-l-2 border-placeholderGray px-4">
        {/* 나의 게시글 api 요청 후, 그 결과에 따라 map으로 반복문 진행. */}
        <div className="flex h-10 w-[42.5rem] flex-row items-center justify-between border border-b-placeholderGray">
          <div>게시글 제목</div>
          <div className="flex flex-row gap-2">
            <button
              className="h-7 w-14 rounded-md bg-mainBlue text-white"
              aria-label="modify button"
              onClick={() => handleEditClick(postData)}
            >
              수정
            </button>
            <button
              className="h-7 w-14 rounded-md bg-red-500 text-white"
              aria-label="delete button"
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyArticle;
