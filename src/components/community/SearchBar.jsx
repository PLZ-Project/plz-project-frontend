import { FaCircle, FaFire, FaSearch } from 'react-icons/fa';
import { apiInstanceWithoutToken } from '../../api/apiInstance';

function SearchBar() {
  // const handleSearchClick = async () => {
  //   // 검색어 필터를 위한 제목, 제목 + 내용, 작성자 select 값과 검색어를 가져와서 검색 결과를 보여준다.
  //   // elastic search를 사용하여 검색 결과를 가져온다.
  //   // 검색 결과는 layout에 관계없이 항상 전체 게시글 개수와 default로 첫번째 페이지 번호와 게시글 9개가 fetch의 결과로 나와야한다.
  //   // 검색 결과가 없을 경우에는 "검색 결과가 없습니다." 라는 메시지를 보여준다.
  //   try {
  //     const response = await apiInstanceWithoutToken.get('/search');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="mb-4 flex h-[4.5rem] w-[60rem] flex-row items-center justify-between bg-slate-900 py-4">
      <div className="ml-4 flex flex-row gap-2">
        <button aria-label="whole article">
          <div className="flex flex-row items-center gap-2">
            <FaCircle className="text-orange-600 text-base" />
            <p className="text-white text-base">전체</p>
          </div>
        </button>
        <button aria-label="hot article">
          <div className="flex flex-row items-center gap-2">
            <FaFire className="text-orange-600 text-base" />
            <p className="text-white text-base">인기</p>
          </div>
        </button>
      </div>
      <div className="mr-4 flex flex-row gap-4">
        {/* 이 div에는 검색어 필터를 위한 제목, 제목 + 내용, 작성자 select 가 들어가야하고, 검색어 입력창과 검색 버튼이 필요하다. */}
        <select defaultValue={1} className="h-10 b focus:outline-none rounded-md pl-1">
          <option value={1}>제목</option>
          <option value={2}>제목 + 내용</option>
          <option value={3}>작성자</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" className="focus:outline-none w-[15.2rem] pl-2 rounded-md" />
        <button aria-label="search button">
          <FaSearch className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
