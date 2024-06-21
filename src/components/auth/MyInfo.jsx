import { useState, useEffect } from 'react';

import { apiInstance } from '../../api/apiInstance';
import ChangePW from '../modal/ChangePW';
import axios from 'axios';

function MyInfo({ userInfo }) {
  const email = userInfo.email;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [isEditNickname, setIsEditNickname] = useState(false);
  // const [isEditPassword, setIsEditPassword] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // 닉네임 중복 검사 api 없음.
  useEffect(() => {
    const checkDuplicateNickname = async () => {
      try {
        const response = await apiInstance.post('/check-duplicate-nickname', {
          nickname: newNickname
        });
        const data = await response.json();
        setIsDuplicateNickname(data.isDuplicate);
      } catch (error) {
        console.error('Error checking duplicate nickname:', error);
      }
    };

    if (isEditNickname) {
      const timer = setTimeout(checkDuplicateNickname, 3000); // 3초 후에 중복 검사 API 호출
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isEditNickname, newNickname]);

  const clickModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 닉네임 취소 버튼을 누르면, 닉네임을 변경하기 전으로 돌아가야 한다. 현재 이 부분에서 에러 발생.
  const handleCancelEditNickname = () => {
    setIsEditNickname(false);
    setNewNickname(userInfo.nickname);
  };

  const handleSaveNickname = async () => {
    try {
      const response = await axios.post(
        '/api/user/updateNickname',
        {
          nickname: newNickname
        },
        {
          headers: {
            access_token: localStorage.getItem('accessToken'),
            refresh_token: localStorage.getItem('refreshToken')
          }
        }
      );
      const data = await response.json();
      if (data.success) {
        setNickname(newNickname);
        localStorage.setItem('nickname', newNickname);
        setIsEditNickname(false);
      } else {
        alert('닉네임 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };

  return (
    <div className="flex h-[30rem] w-[52rem] flex-row rounded-lg bg-white">
      <div className="my-2 flex w-[7.5rem] items-center justify-center border-r-2">나의 정보</div>
      <div className="ml-4 flex flex-col">
        <div id="email" className="flex h-40 w-[40rem] flex-row items-center">
          <p className="w-16">이메일</p>
          <input
            type="email"
            defaultValue={email}
            disabled
            className="ml-4 w-[25rem] rounded-md border bg-placeholderGray text-black"
          />
        </div>
        <div id="nickname" className="flex h-40 w-[40rem] flex-row items-center">
          <p className="w-16">닉네임</p>
          {isEditNickname ? (
            <div className="flex items-center">
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="ml-4 w-[25rem] rounded-md border bg-bgGray text-black"
              />
              {isDuplicateNickname ? (
                <p className="ml-4 text-red-500">닉네임이 중복됩니다.</p>
              ) : (
                <button
                  className={`ml-4 h-7 w-14 rounded-md text-white ${
                    isDuplicateNickname ? 'bg-mainBlue' : 'bg-placeholderGray'
                  }`}
                  onClick={handleSaveNickname}
                  disabled={isDuplicateNickname}
                >
                  저장
                </button>
              )}
              <button
                onClick={handleCancelEditNickname}
                className="ml-4 h-7 w-14 rounded-md bg-mainBlue text-white"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                defaultValue={nickname}
                disabled
                className="ml-4 w-[25rem] rounded-md border bg-placeholderGray text-black"
              />
              <button
                className="ml-4 h-7 w-14 rounded-md bg-mainBlue text-white"
                onClick={() => setIsEditNickname(true)}
              >
                수정
              </button>
            </div>
          )}
        </div>
        <div id="password" className="w-40rem flex h-40 flex-row items-center">
          <p className="w-16">비밀번호</p>
          {/* 비밀번호 변경 버튼 나머지 부분은 모달로 처리 */}
          <button
            onClick={clickModalOpen}
            className="ml-4 h-7 w-14 rounded-md bg-mainBlue text-white"
          >
            변경
          </button>
        </div>
      </div>
      {isModalOpen && <ChangePW toggleModal={toggleModal} />}
    </div>
  );
}

export default MyInfo;
