import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Delta } from 'quill/core';
import Button from '../common/Button';
import { apiInstance } from '../../api/apiInstance';

function PostArticleForm({ isEditing, postData }) {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(isEditing);
  const [title, setTitle] = useState(postData?.title || '');
  // const [content, setContent] = useState(postData?.content || '');
  const [selectedBoard, setSelectedBoard] = useState(5);
  const boardInfo = localStorage.getItem('boardList');
  const boardList = JSON.parse(boardInfo);
  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    navigate('/main');
  };

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [[{ header: [1, 2, false] }], ['image']]
    }
  });

  useEffect(() => {
    if (isEditMode && quill) {
      const delta = new Delta(JSON.parse(postData.content));
      quill.setContents(delta);
      setTitle(postData.title);
      setSelectedBoard(postData.boardId);
    }
  }, [isEditMode, quill, postData]);

  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };

  const saveToServer = async (file) => {
    const body = new FormData();
    body.append('images', file);
    try {
      await axios
        .post('/api/article/imageUpload', body, {
          headers: {
            accesstoken: localStorage.getItem('accessToken'),
            refreshtoken: localStorage.getItem('refreshToken')
          }
        })
        .then((response) => {
          const images = response.data;
          images.forEach((image) => {
            insertToEditor(image.path);
          });
        });
    } catch (error) {
      console.error('Error uploading image:', error);
      // 에러 처리 로직 추가
    }
  };

  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (quill) {
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
  }, [quill]);

  const handleSubmit = async () => {
    if (quill) {
      const content = quill.getContents();
      const formData = new URLSearchParams();
      formData.append('content', JSON.stringify(content));
      formData.append('title', title);
      formData.append('boardId', selectedBoard);

      try {
        if (isEditMode) {
          await apiInstance.put(`/article/${postData.id}`, formData);
          navigate('/main');
        } else {
          await apiInstance.post('/article', formData);
          navigate('/main');
        }
      } catch (error) {
        console.error('Error uploading post:', error);
        // 에러 처리 로직 추가
      }
    }
  };

  return (
    <div className="flex w-[52rem] flex-col gap-2">
      <div className="flex h-[4.5rem] w-[52rem] flex-row items-center justify-between rounded-md bg-white px-4 focus:outline-none">
        <h2>글쓰기</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="mr-4 w-96 rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
          placeholder="제목을 입력하세요"
        />
        <div className="flex items-center">
          <select value={selectedBoard} onChange={handleBoardChange}>
            {boardList.boards.rows.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-[30rem] w-[52rem] bg-white">
        <div ref={quillRef}></div>
      </div>
      <div className="mt-11 flex h-[4.5rem] flex-row justify-between">
        <button
          className="h-9 w-[10.25rem] rounded-md border bg-placeholderGray text-white"
          aria-label="cancel button"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          className="h-9 w-[10.25rem] rounded-md border bg-yel text-white"
          aria-label="submit button"
          onClick={handleSubmit}
        >
          등록
        </button>
        {/* <Button width={10.25} height={2} onClick={handleCancel}>
          취소
        </Button>
        <Button width={10.25} height={2} type="filled" onClick={handleSubmit}>
          등록
        </Button> */}
      </div>
    </div>
  );
}

export default PostArticleForm;
