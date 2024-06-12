import NoImage from '../../assets/noImage.svg?react';

function HorizontalPost({ id, board, likes, title, views, date, writer }) {
  // const { id, board, likes, title, views, date, writer } = posts;
  return (
    <div className="flex h-[4.5rem] w-[52rem] flex-row gap-4 border border-b-bgGray bg-white px-4 hover:bg-mainBlue-500">
      <div className="flex  w-7 items-center justify-center">
        <p>{likes}</p>
      </div>
      <div className="flex w-[3.375rem] items-center justify-center">
        <NoImage w={54} h={54} />
        {/* 이미지 컴포넌트 */}
      </div>
      <div className="flex flex-col justify-center">
        <div>{title}</div>
        <div className="flex w-[42.75rem] flex-row justify-between">
          <div className="flex flex-row gap-2">
            <p>{board}</p>
            <p>{date}</p>
            <p>조회 {views}</p>
          </div>
          <div>{writer}</div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalPost;
