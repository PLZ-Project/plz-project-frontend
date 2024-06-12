import DefaultImage from '../../assets/defaultImage.svg?react';

function VerticalPost({ board, like, view, content, date, writer }) {
  return (
    <div className="mb-1.5 ml-0.5 flex h-52 w-48 flex-col rounded-md bg-bgGray">
      <div className="my-2 flex h-24 items-center justify-center">
        <DefaultImage w={100} h={100} />
      </div>
      <div className="flex h-28 flex-col items-center justify-center px-4">
        <div className="flex w-full flex-row justify-between">
          <div>{board}</div>
          <div className="flex flex-row gap-1">
            <div>조회 {view}</div>
            <div>좋아요 {like}</div>
          </div>
        </div>
        <div className="line-clamp-1 h-6">{content}</div>
        <div className="flex w-full flex-row justify-between">
          <div>{date}</div>
          <div>{writer}</div>
        </div>
      </div>
    </div>
  );
}

export default VerticalPost;
