// pagination 컴포넌트.
// 한 페이지에 보여줄 포스트의 개수를 정하고, 그에 따라 페이지네이션을 만들어주는 컴포넌트이다.
// 한 페이지 최대 포스트 개수 : 9개
// 페이지 개수 계산 공식 : Math.ceil(전체 포스트 개수 / 한 페이지 최대 포스트 개수)
// 페이지네이션은 1부터 시작한다.
// 페이지네이션을 클릭하면 해당 페이지의 포스트를 보여준다.
import { useAtom } from 'jotai';
import { useState } from 'react';
import layoutAtom from '../../atoms/layoutAtom';
import HorizontalView from './HorizontalView';
import { dummyData } from '../../mock/dummy';
import VerticalView from './VerticalView';
import SearchBar from './SearchBar';

function Pagination() {
  // layoutAtom의 값에 따라 가로형 레이아웃과 세로형 레이아웃을 선택한다.
  // 다만 현재 컴포넌트에선 layoutAtom의 상태만 필요하고, setLayout은 필요하지 않다.
  // layout이 true면 가로형 레이아웃, false면 세로형 레이아웃이다.
  const [{ layout }] = useAtom(layoutAtom);
  const postCount = dummyData.length;
  const postPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(postCount / postPerPage);

  // 현재 페이지에서 보여줄 포스트들
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = dummyData.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 이동
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 이전 페이지 이동
  const prevPage = () => {
    setCurrentPage((currentPage) => (currentPage - 1 > 0 ? currentPage - 1 : currentPage));
  };

  // 다음 페이지 이동
  const nextPage = () => {
    setCurrentPage((currentPage) => (currentPage + 1 <= pageCount ? currentPage + 1 : currentPage));
  };

  return (
    <div className="flex flex-col">
      <SearchBar />
      {/* 조건부 렌더링 */}
      <div className="h-[40.5rem]">
        {layout === 'horizontal' ? (
          <HorizontalView posts={currentPosts} />
        ) : (
          <VerticalView posts={currentPosts} />
        )}
      </div>
      {/* 페이지네이션 */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <button
          onClick={prevPage}
          className="rounded-md border bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          이전
        </button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`rounded-md border px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="rounded-md border bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Pagination;
