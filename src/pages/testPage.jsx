import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { apiInstance, apiInstanceWithoutToken } from '../api/apiInstance';
import GlobalLayout from '../components/layout/GlobalLayout';

function TestPage() {
  const socket = io('https://www.plz-project.site', {
    transports: ['websocket', 'polling'],
  });

  const { id } = useParams();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  if (!id) {
    return <div>URL에서 제공된 글 ID가 없습니다.</div>;
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiInstanceWithoutToken.get(`/comment/list/${id}`);
        const comments = response.data.comments.rows;
        queryClient.setQueryData(['commentData', id], comments); // 쿼리 데이터 업데이트
      } catch (error) {
        console.error('댓글을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchComments();

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // 소켓 연결이 해제되었을 때 처리
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('newComment', (newComment) => {
      console.log(11111111111111111111);
      queryClient.invalidateQueries(['commentData', id]); // 새 댓글 도착 시 쿼리 무효화
    });

    return () => {
      socket.off('newComment');
    };
  }, [id, queryClient, socket]);

  const { data: commentData, isLoading, error } = useQuery({ queryKey: ['commentData', id],
    queryFn: async () => {
      const response = await apiInstanceWithoutToken.get(`/comment/list/${id}`);
      return response.data.comments.rows;
    } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiInstance.post('/comment', { articleId: id, content: comment });
    } catch (error) {
      console.error('포스트 업로드 중 오류가 발생했습니다:', error);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>글 데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <GlobalLayout>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="articleId" value={id} />
          <input
            type="text"
            name="content"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">전송</button>
        </form>
        <div>
          {commentData.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <span>{comment.author}</span>
            </div>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
}

export default TestPage;
