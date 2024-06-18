import { useMutation, useQueryClient } from '@tanstack/react-query';
import sanitize from 'sanitize-html';
import { apiInstance } from '../../api/apiInstance';

function PostSpecSection({ id }) {
  const queryClient = useQueryClient();
  const postData = queryClient.getQueryData(['postData', id]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo.id;
  console.log(postData);
  // 게시글 상세 정보 컴포넌트
  // 게시글 상세 정보 컴포넌트는 게시글의 상세 정보를 보여주는 컴포넌트이다.
  // 가장 위에는 게시글의 제목이 들어가고,
  // 그 아래에는 게시판 이름, 작성 시간, 작성자, 조회수, 댓글 수, 좋아요 수가 들어간다.
  // 그 아래에는 게시글의 내용이 들어간다.
  // 그 아래에는 좋아요 버튼이 들어간다.
  // 그 아래에는 댓글 컴포넌트가 들어간다.
  // 댓글 컴포넌트는 댓글 작성 컴포넌트와 댓글 목록 컴포넌트로 구성된다.
  const convertDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month}-${day}`;
  };

  const contents = sanitize(postData.content, {
    allowedTags: sanitize.defaults.allowedTags.concat(['img', 'h1', 'h2', 'p']),
    allowedAttributes: {
      img: ['src'],
      h1: ['style'],
      h2: ['style'],
      p: ['style']
    },
    allowedStyles: {
      h1: {
        'font-size': [/^2rem$/]
      },
      h2: {
        'font-size': [/^1.5rem$/]
      },
      p: {
        'font-size': [/^1rem$/]
      }
    }
  });

  const { mutate } = useMutation({
    mutationFn: async ({ id }) => {
      await apiInstance.post(`/article/like/${id}`, {
        userId,
        id
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['postData', id]);
    },
    onError: (error) => {
      console.error('Error occurred while liking post:', error);
    }
  });

  const handleLike = () => {
    mutate({ id });
  };
  return (
    <div className="flex w-[52rem] flex-col">
      <div>
        <div
          id="title"
          className="flex  h-[36px] items-center border-b border-b-black bg-white pl-2"
        >
          <p className="text-lg">{postData.title}</p>
        </div>
        <div id="desc" className="flex h-[36px] flex-row justify-between bg-white px-4">
          <div className="flex flex-row items-end gap-2">
            <p>{postData.board.name}</p>
            <p>{convertDate(postData.board.createdAt)}</p>
            <p>{postData.user.nickname}</p>
          </div>
          <div className="flex flex-row items-end gap-2">
            <p>조회수 {postData.hit}</p>
            <p>댓글 {postData.commentList.length}</p>
            <p>좋아요 {postData.likeUserList.length}</p>
          </div>
        </div>
      </div>
      <div
        id="contents"
        className="min-h-96 bg-white px-4"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
      <div id="likeBtn">
        <button onClick={handleLike} className="bg-gray-200 hover:bg-gray-300">
          좋아요
        </button>
      </div>
      <div id="comment box">
        <div id="comment input"></div>
        <div id="comment list"></div>
      </div>
    </div>
  );
}

export default PostSpecSection;
