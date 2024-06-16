import { useEffect, useState } from 'react';
import { apiInstance } from '../../api/apiInstance';

function PostSpecSection({ id }) {
  const [postInfo, setPostInfo] = useState({});
  // 게시글 상세 정보 컴포넌트
  // 게시글 상세 정보 컴포넌트는 게시글의 상세 정보를 보여주는 컴포넌트이다.
  // 가장 위에는 게시글의 제목이 들어가고,
  // 그 아래에는 게시판 이름, 작성 시간, 작성자, 조회수, 댓글 수, 좋아요 수가 들어간다.
  // 그 아래에는 게시글의 내용이 들어간다.
  // 그 아래에는 좋아요 버튼이 들어간다.
  // 그 아래에는 댓글 컴포넌트가 들어간다.
  // 댓글 컴포넌트는 댓글 작성 컴포넌트와 댓글 목록 컴포넌트로 구성된다.

  // 게시글 정보 fetch API

  // useEffect로 게시글 정보 fetch API를 호출하고, 의존성 배열에는 id를 넣어준다.

  useEffect(() => {
    async () => {
      try {
        const response = await apiInstance.get(`/article/${id}`);
        setPostInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    return () => {
      setPostInfo({});
    };
  }, [id]);

  return (
    <div className="flex w-[52rem] flex-col">
      <div>
        <div
          id="title"
          className="flex  h-[36px] items-center border-b border-b-black bg-white pl-2"
        >
          <p className="text-lg">제목입니다.</p>
        </div>
        <div id="desc" className="flex h-[36px] flex-row justify-between bg-white px-4">
          <div className="flex flex-row items-end gap-2">
            <p>자유</p>
            <p>2024.05.01</p>
            <p>김범수</p>
          </div>
          <div className="flex flex-row items-end gap-2">
            <p>조회수 100</p>
            <p>댓글 10</p>
            <p>좋아요 10</p>
          </div>
        </div>
      </div>
      <div id="contents"></div>
      <div id="likeBtn"></div>
      <div id="comment box">
        <div id="comment input"></div>
        <div id="comment list"></div>
      </div>
    </div>
  );
}

export default PostSpecSection;
