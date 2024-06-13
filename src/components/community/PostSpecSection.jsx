function PostSpecSection() {
  // 게시글 상세 정보 컴포넌트

  // 가장 위에는 게시글의 제목이 들어가고,
  // 그 아래에는 게시판 이름, 작성 시간, 작성자, 조회수, 댓글 수, 좋아요 수가 들어간다.
  // 그 아래에는 게시글의 내용이 들어간다.
  // 그 아래에는 좋아요 버튼이 들어간다.
  // 그 아래에는 댓글 컴포넌트가 들어간다.
  // 댓글 컴포넌트는 댓글 작성 컴포넌트와 댓글 목록 컴포넌트로 구성된다.

  return (
    <div className="flex w-[52rem] flex-col">
      <div id="title"></div>
      <div id="desc"></div>
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
