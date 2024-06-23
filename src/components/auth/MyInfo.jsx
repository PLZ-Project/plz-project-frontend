import { useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../../api/apiInstance';
import ChangePW from '../modal/ChangePW';

function MyInfo({ userInfo }) {
  const navigate = useNavigate();
  const { email, id } = userInfo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [isEditNickname, setIsEditNickname] = useState(false);

  const [newNickname, setNewNickname] = useState(nickname);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const clickModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 닉네임 취소 버튼을 누르면, 닉네임을 변경하기 전으로 돌아가야 한다. 현재 이 부분에서 에러 발생.
  const handleCancelEditNickname = () => {
    setIsEditNickname(false);
    setNickname(userInfo.nickname);
    setNewNickname(userInfo.nickname);
  };

  // // 유저 정보 refetch
  // const refetchUserInfo = () => {
  //   try {
  //     const response = apiInstance.get(`/user/${id}`);
  //     const { data } = response; // 실제 데이터 추출
  //     console.log(data); // 데이터 확인

  //     // localStorage.setItem('userInfo', JSON.stringify(data));
  //   } catch (error) {
  //     console.error('Error refetching user info:', error);
  //   }
  // };

  const handleSaveNickname = async () => {
    try {
      await apiInstance
        .put('/user/updateNickname', {
          nickname: newNickname
        })
        .then(() => {
          setNickname(newNickname);
          localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, nickname: newNickname }));
        });

      // 로컬 스토리지에 userInfo 업데이트
      // localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, nickname: newNickname }));
      // localStorage.setItem('nickname', newNickname);
      setIsEditNickname(false);
      navigate('/userinfo');
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
              <button
                className="ml-4 h-7 w-14 rounded-md bg-mainBlue text-white"
                onClick={handleSaveNickname}
              >
                저장
              </button>
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
                defaultValue={userInfo.nickname}
                disabled
                className="ml-4 w-[25rem] rounded-md border bg-placeholderGray text-black"
              />
              <button
                className="ml-4 h-7 w-14 rounded-md bg-mainBlue text-white"
                onClick={() => setIsEditNickname(true)}
              >
                변경
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
