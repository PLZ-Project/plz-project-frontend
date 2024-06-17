const Boards = ['정보', '자유', '유머', '일상', '버그', '팁', '질문', '공략'];

function BoardList() {
  return (
    <div className="h-auto w-[20.5rem]">
      {Boards.map((board, idx) => (
        idx === 0 ? (
          <div
            key={idx}
            className="flex-start pl-2 flex h-11 w-[20.5rem] border-y items-center"
          >
            <p className="ml-2 h-6 w-12 text-white">{board}</p>
          </div>
        )
          : (
            <div
              key={idx}
              className="flex-start pl-2 flex h-11 w-[20.5rem] border-y items-center "
            >
              <p className="ml-2 h-6 w-12 text-white">{board}</p>
            </div>
          )
      ))}
    </div>
  );
}

export default BoardList;
