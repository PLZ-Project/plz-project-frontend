import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiInstanceWithoutToken } from '../../api/apiInstance';

const Boards = ['정보', '자유', '유머', '일상', '버그', '팁', '질문', '공략'];

function BoardList() {
  const navigate = useNavigate();
  const boardInfo = localStorage.getItem('boardList');
  const boardList = JSON.parse(boardInfo);
  const queryClient = useQueryClient();
  // map 으로 만들어진 게시판 리스트를 클릭하면,
  // mainpage에서 react-query로 캐시되고 있는 articles를 리페치한다.
  // 이때, 게시판 id를 이용하는데 api는 /api/article/search?boardId={board.id} 이다.
  // 때문에, mutation을 사용하여, boardId를 변경하고, 리페치하는 방식으로 구현한다.
  const { mutate } = useMutation({
    mutationFn: async ({ boardId }) => {
      const response = await apiInstanceWithoutToken.get(`/article/search?boardId=${boardId}`);
      console.log(boardId, '게시판 변경', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['articles'], data);
      navigate('/main');
      console.log(data);
      console.log('게시판 변경 성공');
    },
    onError: (err) => {
      console.error('게시판 변경 실패:', err);
    }
  });
  const onClickBoard = (boardId) => {
    mutate({ boardId });
  };

  return (
    <div className="grid w-72 gap-2 rounded-b-lg p-6 -ml-12 -mt-[1.9rem]">
      {boardList.boards.rows.map((board) => (
        <button
          key={board.id}
          onClick={() => onClickBoard(board.id)}
          className="flex mb-1 w-72 cursor-pointer items-center"
        >
          <p className="flex justify-center items-center w-80 h-16 rounded-[8px] bg-black bg-opacity-85 font-GowunDodum text-white hover:bg-black hover:bg-opacity-85 hover:text-white text-[1.2rem]">
            {board.name}
          </p>
        </button>
      ))}
    </div>
  );
}

export default BoardList;
