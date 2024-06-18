import { useMutation, useQueryClient } from '@tanstack/react-query';
import sanitize from 'sanitize-html';
import { apiInstance } from '../../api/apiInstance';
import { IoMdRefresh } from 'react-icons/io';
import { useState } from 'react';

function PostSpecSection({ id }) {
  const queryClient = useQueryClient();
  const postData = queryClient.getQueryData(['postData', id]);
  const commentData = queryClient.getQueryData(['commentData', id]) || { rows: [] };
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo.id;
  console.log(commentData);
  // console.log(postData);
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
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
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

  const { mutate: like } = useMutation({
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

  // const { mutate: modifyPost } = useMutation({
  //   mutationFn: async({})
  // });

  // const { mutate: commentPost } = useMutation({
  //   mutationFn: async ({ articleId, content }) => {
  //     await apiInstance.post('/comment', {
  //       articleId,
  //       content
  //     });
  //   },
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries(['postData', id]);
  //   },
  //   onError: (error) => {
  //     console.error('Error occurred while posting comment:', error);
  //   }
  // });

  const handleLike = () => {
    like({ id });
  };

  const handleCommentSubmit = () => {
    commentPost({ articleId: id, content: commentText });
  };
  return (
    <div className="flex w-[52rem] flex-col rounded-lg">
      <div>
        <div id="title" className="flex h-[36px] items-center rounded-t-lg bg-white pl-2">
          <p className="pl-2 text-lg">{postData.title}</p>
        </div>
        <div
          id="desc"
          className="mb-4 flex h-[36px] flex-row justify-between rounded-b-lg bg-white px-4"
        >
          <div className="flex flex-row items-center gap-2">
            <p>{postData.board.name}</p>
            <p>{convertDate(postData.board.createdAt)}</p>
            <p>{postData.user.nickname}</p>
          </div>
          <div className="flex flex-row items-end gap-2">
            <p>조회수 {postData.hit}</p>
          </div>
        </div>
      </div>
      <div
        id="contents"
        className="min-h-96 rounded-lg bg-white px-4"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
      <div
        id="likeBtn"
        className="mb-4 flex h-[3rem] flex-row justify-center rounded-b-lg bg-white"
      >
        <button
          onClick={handleLike}
          className="h-[2rem] rounded-md bg-gray-200 px-2 hover:bg-gray-300"
        >
          좋아요 {postData.likeUserList.length}
        </button>
      </div>
      <div id="comment box">
        <div
          id="comment info"
          className="mb-4 flex h-[3rem] flex-row items-center justify-between rounded-lg bg-white"
        >
          <div id="comment count" className="flex flex-row gap-2">
            <p className="ml-4 font-bold">댓글</p>
            {postData.commentList.length}
          </div>
          <button id="comment refresh" className="mr-4">
            <IoMdRefresh size={18} />
          </button>
        </div>
        <div
          id="comment input"
          className="flex flex-col items-center justify-center rounded-lg bg-white py-6"
        >
          <textarea
            id="comment input"
            className="h-[6rem] w-[48rem] resize-none border-l border-r border-t border-placeholderGray bg-white focus:outline-none"
            placeholder="댓글을 입력하세요."
            value={commentText}
            onChange={handleCommentChange}
          />
          <div className="flex w-[48rem] flex-row justify-between border border-placeholderGray">
            <div className="flex w-[42rem] flex-row items-center justify-end text-placeholderGray">
              <p className="mr-2">({commentText.length}/1000)</p>
            </div>
            <button
              id="comment submit"
              className="h-8 w-24 bg-mainBlue text-white"
              aria-label="submit comment button"
              onClick={handleCommentSubmit}
            >
              등록
            </button>
          </div>
        </div>
        <div id="comment list">
          {commentData.comments.rows.map((comment) => (
            <div key={comment.id} className="flex flex-col items-center justify-center">
              <div className="flex w-[48rem] flex-row items-center justify-between border border-placeholderGray">
                <div className="flex flex-row items-center">
                  {/* <p className="ml-4">{comment.user.nickname}</p> */}
                  <p className="ml-4">{comment.content}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <p>{convertDate(convertDate(comment.createdAt))}</p>
                  <button className="h-6 w-12 bg-red-500 text-white">삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostSpecSection;
