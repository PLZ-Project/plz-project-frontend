const Boards = ['정보', '자유', '유머', '일상', '버그', '팁', '질문', '공략'];

function BoardList() {
  return (
    <div className="h-auto w-[20.5rem]  bg-white py-2">
      {Boards.map((board, idx) => (
        <div
          key={idx}
          className="flex-start ml-2 flex h-8 w-[19.5rem] items-center border-b border-bgGray"
        >
          <p className="ml-2 h-6 w-12">{board}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardList;
