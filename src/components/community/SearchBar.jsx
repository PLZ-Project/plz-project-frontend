import { FaCircle, FaFire, FaSearch } from 'react-icons/fa';
import { apiInstanceWithoutToken } from '../../api/apiInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [searchCondition, setSearchCondition] = useState('title');
  const [keyword, setKeyword] = useState('');

  const handleOnChange = (e) => {
    setKeyword(e.target.value);
  };
  const queryClient = useQueryClient();
  // 검색 api 호출에 따라 캐시되는 ['articles']를 변경.

  const { mutate } = useMutation({
    mutationFn: async ({ searchCondition, keyword }) => {
      const response = await axios.get(
        `api/article/search?searchType=${searchCondition}&keyword=${keyword}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['articles'], data);
    },
    onError: (err) => {
      console.error('검색 실패:', err);
    }
  });

  const onClickSearch = () => {
    mutate({ searchCondition, keyword });
  };
  return (
    <div className="mb-4 flex h-[4.5rem] w-[52rem] flex-row items-center justify-between rounded-lg bg-white">
      <div className="ml-4 flex flex-row gap-2">
        <button aria-label="whole article">
          <div className="flex flex-row items-center gap-2">
            <FaCircle className="text-gray-500" />
            <p className="text-gray-500">전체</p>
          </div>
        </button>
        <button aria-label="hot article">
          <div className="flex flex-row items-center gap-2">
            <FaFire className="text-gray-500" />
            <p className="text-gray-500">인기</p>
          </div>
        </button>
      </div>
      <div className="mr-4 flex flex-row gap-4">
        {/* 이 div에는 검색어 필터를 위한 제목, 제목 + 내용, 작성자 select 가 들어가야하고, 검색어 입력창과 검색 버튼이 필요하다. */}
        <select
          defaultValue={1}
          className="h-12 focus:outline-none"
          onChange={(e) => setSearchCondition(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="title_content">제목 + 내용</option>
          <option value="author">작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="focus:outline-none"
          value={keyword}
          onChange={handleOnChange}
        />
        <button aria-label="search button" onClick={onClickSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
