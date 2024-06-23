import { useState } from 'react';

function MyComment() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentData, setCommentData] = useState('');

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    setCommentData('댓글 내용');
  };

  const fetchCommentData = () => {
    // 나의 댓글 api 요청
    // useEffect로 처리
  };

  const handleSaveClick = () => {
    // 수정 api 요청
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    // 삭제 api 요청
  };

  return (
    <div className="flex h-[30rem] w-[52rem] flex-row rounded-lg bg-white">
      <div className="flex w-[7.5rem] items-center justify-center">나의 댓글</div>
      <div className="flex flex-col gap-0 border-l-2 border-placeholderGray px-4">
        {/* 나의 댓글 api 요청 후, 그 결과에 따라 map으로 반복문 진행. */}
        <div className="flex h-10 w-[42.5rem] flex-row items-center justify-between border border-b-placeholderGray">
          {isEditMode ? (
            <input
              type="text"
              value={commentData}
              onChange={(e) => setCommentData(e.target.value)}
              className="w-full"
            />
          ) : (
            <div>댓글 내용</div>
          )}
          <div className="flex flex-row gap-2">
            {isEditMode ? (
              <button
                className="h-7 w-14 rounded-md bg-yel text-white"
                onClick={handleSaveClick}
                aria-label="save button"
              >
                저장
              </button>
            ) : (
              <button
                className="h-7 w-14 rounded-md bg-yel text-white"
                onClick={handleEditMode}
                aria-label="modify button"
              >
                수정
              </button>
            )}
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

export default MyComment;
