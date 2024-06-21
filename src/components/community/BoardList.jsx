import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { apiInstanceWithoutToken } from '../../api/apiInstance';
import { selectedBoardIdAtom } from '../../atoms/selectBoardId';

const Boards = ['정보', '자유', '유머', '일상', '버그', '팁', '질문', '공략'];

function BoardList() {
  const navigate = useNavigate();
  const [boardId, setBoarId] = useAtom(selectedBoardIdAtom);
  const boardInfo = localStorage.getItem('boardList');
  const boardList = JSON.parse(boardInfo);
  const queryClient = useQueryClient();
  // map 으로 만들어진 게시판 리스트를 클릭하면,
  // mainpage에서 react-query로 캐시되고 있는 articles를 리페치한다.
  // 이때, 게시판 id를 이용하는데 api는 /api/article/search?boardId={board.id} 이다.
  // 때문에, mutation을 사용하여, boardId를 변경하고, 리페치하는 방식으로 구현한다.
  // const { mutate } = useMutation({
  //   mutationFn: async ({ boardId }) => {
  //     const response = await apiInstanceWithoutToken.get(`/article/search?boardId=${boardId}`);
  //     console.log(boardId, '게시판 변경', response.data);
  //     return response.data;
  //   },
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(['articles', boardId], data);
  //     navigate('/');
  //     console.log(data);
  //     console.log('게시판 변경 성공');
  //   },
  //   onError: (err) => {
  //     console.error('게시판 변경 실패:', err);
  //   }
  // });
  const onClickBoard = (boardId) => {
    setBoarId(boardId);
    navigate('/');
  };

  return (
    <div className="grid w-auto gap-2 rounded-b-lg bg-sky p-6">
      {boardList.boards.rows.map((board) => (
        <button
          key={board.id}
          onClick={() => onClickBoard(board.id)}
          className="flex w-full cursor-pointer items-center border-b border-bgGray hover:bg-gray-300"
        >
          <p className="w-full rounded-[8px] bg-white p-4 hover:bg-gray-300 hover:text-black">
            {board.name}
          </p>
        </button>
      ))}
    </div>
  );
}

export default BoardList;
