import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000'; // 서버의 주소

function TestPage() {
  const socket = socketIOClient(ENDPOINT);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 서버에서 'newComment' 이벤트를 수신하면 새 댓글을 추가
    socket.on('newComment', (newComment) => {
      setComments([...comments, newComment]);
    });

    return () => socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
  }, [comments]);

  const sendComment = (comment) => {
    socket.emit('comment', comment);
  };

  return (
    <div>
      <h2>댓글 목록</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newComment = e.target.elements.comment.value;
          sendComment(newComment);
          e.target.elements.comment.value = ''; // 입력 필드 초기화
        }}
      >
        <input type="text" name="comment" />
        <button type="submit">댓글 추가</button>
      </form>
    </div>
  );
}

export default TestPage;
