import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Boards = ['정보', '자유', '유머', '일상', '버그', '팁', '질문', '공략'];

function BoardList() {
  const queryClient = useQueryClient();
  const boardList = queryClient.getQueryData(['boardList']);
  console.log('boardList', boardList);

  // map 으로 만들어진 게시판 리스트를 클릭하면,
  // mainpage에서 react-query로 캐시되고 있는 articles를 리페치한다.
  // 이때, 게시판 id를 이용하는데 api는 /api/article/search?boardId={board.id} 이다.
  // 때문에, mutation을 사용하여, boardId를 변경하고, 리페치하는 방식으로 구현한다.
  const { mutate } = useMutation({
    mutationFn: async ({ boardId }) => {
      const response = await axios.get(`/api/article/search?boardId=${boardId}`);
      console.log(boardId, '게시판 변경', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['articles'], data);
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
    <div className="h-auto w-[20.5rem]  bg-white py-2">
      {boardList.rows.map((board) => (
        <div
          key={board.id}
          onClick={() => onClickBoard(board.id)}
          className="flex-start ml-2 flex h-8 w-[19.5rem] items-center border-b border-bgGray"
        >
          <p className="ml-2 h-6 w-12">{board.name}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardList;
