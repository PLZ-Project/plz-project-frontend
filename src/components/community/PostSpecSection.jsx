import { useMutation, useQueryClient } from '@tanstack/react-query';
import sanitize from 'sanitize-html';
import { IoMdRefresh } from 'react-icons/io';
import { useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import PostDelete from '../modal/PostDelete';
import { apiInstance } from '../../api/apiInstance';
import useCommentActions from '../../Rmutate/commentMutate';
import { userNickName } from '../../../utils/userNickname';

function PostSpecSection({ id }) {
  const queryClient = useQueryClient();
  const postData = queryClient.getQueryData(['postData', id]);
  const commentData = queryClient.getQueryData(['commentData', id]) || { rows: [] };
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [commentModifyText, setCommentModifyText] = useState('');
  let userId;
  if (userInfo) {
    userId = userInfo.id;
  }

  const { commentPost, commentModify, commentDelete } = useCommentActions(id);
  const postContent = JSON.parse(postData.content);
  function deltaToHtml(deltaData) {
    let htmlContent = '';

    for (const op of deltaData.ops) {
      if (typeof op.insert === 'string') {
        // 텍스트 삽입
        htmlContent += `<p>${op.insert.replace(/\n/g, '<br>')}</p>`;
      } else if (typeof op.insert === 'object') {
        // 이미지 삽입
        htmlContent += `<p><img src="${op.insert.image}"></p>`;
      }
    }

    return htmlContent;
  }

  const saniContent = deltaToHtml(postContent);

  const handleEditClick = () => {
    navigate('/post/modify/:id', { state: { isEditing: true, postData } });
  };

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
  const handleCommentEditMode = () => {
    setIsCommentEditing((prev) => !prev);
  };

  const contents = sanitize(saniContent, {
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

  const handleLike = () => {
    like({ id });
  };

  const handleCommentSubmit = () => {
    commentPost({ articleId: id, content: commentText });
    setCommentText('');
  };

  const changeCommentText = (e) => {
    setCommentModifyText(e.target.value);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };
  return (
    <div className="flex w-[52rem] flex-col rounded-lg">
      <div>
        <div
          id="title"
          className="flex h-[36px] items-center justify-between rounded-t-lg bg-white pl-2"
        >
          <p className="pl-2 text-lg">{postData.title}</p>

          {postData.user.id === userId && (
            <div className="flex flex-row gap-0">
              <button onClick={handleEditClick} aria-label="edit button" className="pr-2">
                <GoPencil size={24} />
              </button>
              <button aria-label="delete button" className="pr-2" onClick={toggleDeleteModal}>
                <RiDeleteBin2Line size={24} />
              </button>
            </div>
          )}
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
        className="min-h-96 rounded-t-lg bg-white px-4"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
      <div id="likeBtn" className="mb-4 flex h-12 flex-row justify-center rounded-b-lg bg-white">
        <button onClick={handleLike} className="h-8 rounded-md bg-gray-200 px-2 hover:bg-gray-300">
          좋아요 {postData.likeUserList.length}
        </button>
      </div>
      <div id="comment box">
        <div
          id="comment info"
          className="mb-4 flex h-12 flex-row items-center justify-between rounded-lg bg-white"
        >
          <div id="comment count" className="flex flex-row gap-2">
            <p className="ml-4 font-bold">댓글</p>
            {postData.commentList.length}
          </div>
          <button aria-label="comment refresh" className="mr-4">
            <IoMdRefresh size={25} />
          </button>
        </div>
        <div
          id="comment input"
          className="flex flex-col items-center justify-center rounded-lg bg-white py-6"
        >
          <textarea
            id="comment input"
            className="h-24 w-[48rem] resize-none border-x border-t border-placeholderGray bg-white focus:outline-none"
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
        <div id="comment list" className="mb-8 flex w-[52rem] flex-col justify-center">
          {commentData.comments.rows.map((comment) => (
            <div
              key={comment.id}
              className="flex w-[48rem] flex-row justify-between border border-black"
            >
              <div className="flex w-[40rem] flex-col">
                <div className="font-bold">{userNickName(comment.User.nickname)}</div>
                {isCommentEditing ? (
                  <textarea
                    id="comment content"
                    value={commentModifyText}
                    className="h-6 resize-none border"
                    onChange={changeCommentText}
                  />
                ) : (
                  <div id="comment content">{comment.content}</div>
                )}
                <div id="comment createdAt" className="font-thin">
                  {convertDate(comment.createdAt)}
                </div>
              </div>
              <div className="flex w-12 flex-row">
                {userId === comment.User.id && (
                  <>
                    {isCommentEditing ? (
                      <>
                        <button
                          onClick={() => {
                            commentModify({ commentId: comment.id, content: commentModifyText });
                            handleCommentEditMode();
                          }}
                          aria-label="comment modify button"
                        >
                          <FaSave size={25} />
                        </button>
                        <button onClick={handleCommentEditMode} aria-label="edit comment button">
                          <FaTimesCircle size={25} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleCommentEditMode} aria-label="edit comment button">
                          <GoPencil size={25} />
                        </button>
                        <button
                          onClick={() => commentDelete({ commentId: comment.id })}
                          aria-label="delete comment button"
                        >
                          <RiDeleteBin2Line size={25} />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isDeleteModalOpen && <PostDelete toggleModal={toggleDeleteModal} postId={postData.id} />}
    </div>
  );
}

export default PostSpecSection;
