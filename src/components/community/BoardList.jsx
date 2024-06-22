import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { selectedBoardIdAtom } from '../../atoms/selectBoardId';

function BoardList() {
  const navigate = useNavigate();
  const [boardId, setBoarId] = useAtom(selectedBoardIdAtom);
  const boardInfo = localStorage.getItem('boardList');
  const boardList = JSON.parse(boardInfo);

  const onClickBoard = (boardId) => {
    setBoarId(boardId);
    navigate('/main');
  };

  return (
    <div className="-ml-12 -mt-[1.9rem] grid w-72 gap-2 rounded-b-lg p-6">
      {boardList.boards.rows.map((board) => (
        <button
          key={board.id}
          onClick={() => onClickBoard(board.id)}
          className="mb-1 flex w-72 cursor-pointer items-center"
        >
          <p className="font-GowunDodum flex h-16 w-80 items-center justify-center rounded-[8px] bg-black bg-opacity-85 text-[1.2rem] text-white hover:bg-black hover:bg-opacity-85 hover:text-white">
            {board.name}
          </p>
        </button>
      ))}
    </div>
  );
}

export default BoardList;
