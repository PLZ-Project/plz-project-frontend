import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from '../../../utils/debounce';
import { apiInstance } from '../../api/apiInstance';
// import { apiInstance } from '../../api/api';

function ChangePW({ toggleModal }) {
  // 비밀번호 변경 모달
  // 총 3개의 input이 존재
  // 이 중에서 첫 번째 input은 현재 비밀번호를 입력하는 input
  // 여기서 입력한 비밀번호가 현재 비밀번호와 일치하는지 확인하는 API 요청을 보내야 함
  // 일치하면 다음 두 개의 input이 활성화되고, 일치하지 않으면 에러 메시지를 띄워야 함

  // 두 번째 input은 새로운 비밀번호를 입력하는 input
  // 세 번째 input은 새로운 비밀번호를 다시 입력하는 input
  // 이 두 input은 서로 일치하는지 확인해야 함
  // 일치하지 않으면 에러 메시지를 띄워야 함
  // 일치하면 변경 버튼이 활성화되어야 함

  // 변경 버튼을 누르면 새로운 비밀번호로 변경하는 API 요청을 보내야 함
  // const setIsModalOpen = useSetAtom(modalAtom);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const handleModalClose = () => {
    toggleModal();
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleModal();
      }
    };
    document.addEventListener('mousedown', handleOutSideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [modalRef, toggleModal]);

  // 유효성 검증 로직
  // const checkPassword = async (value) => {
  //   try {
  //     const response = await apiInstance.post('/check-password', {
  //       password: value
  //     });
  //     const data = await response.json();
  //     return data.success;
  //   } catch (error) {
  //     console.error('Error checking password:', error);
  //   }

  //   return false;
  // };
  // 현재 비밀번호가 일치하는지 확인하는 API 요청
  // const debouncePasswordChange = async (value) => {
  //   const isValid = await checkPassword(value);
  //   setIsCurrentPasswordValid(isValid);
  // };

  // const handleCheckCurrentPassword = useMemo(
  //   () => debounce((value) => debouncePasswordChange(value), 1000),
  //   []
  // );

  // handler
  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordAgain = (e) => {
    setNewPasswordAgain(e.target.value);
  };

  const handlePasswordChange = async () => {
    try {
      await apiInstance.put('/user/updatePw', {
        password: newPassword
      });
      alert('비밀번호가 변경되었습니다.');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  useEffect(() => {
    setIsPasswordMatch(newPassword !== '' && newPassword === newPasswordAgain);
  }, [newPassword, newPasswordAgain]);

  return (
    <div className="fixed left-0 top-0 z-[100] flex size-full flex-col items-center justify-center bg-black bg-opacity-70">
      <div ref={modalRef} className="flex h-[30rem] w-[52rem] flex-col items-center bg-white">
        <div className="mt-8 flex flex-col">
          <div
            id="current-password"
            className="flex h-24 w-[40rem] flex-row items-center justify-center"
          >
            <p className="mr-4 w-36 text-right text-lg">현재 비밀번호</p>
            <input
              type="password"
              className="h-10 w-60 border-2 "
              placeholder="현재 비밀번호를 입력하세요."
              value={currentPassword}
              onChange={handleChangeCurrentPassword}
            />
          </div>
          <div
            id="new-password"
            className="flex h-24 w-[40rem] flex-row items-center justify-center"
          >
            <p className="mr-4 w-36 text-right text-lg">새로운 비밀번호</p>
            <input
              type="password"
              className="h-10 w-60 border-2"
              value={newPassword}
              onChange={handleNewPassword}
              placeholder="새로운 비밀번호를 입력하세요."
            />
          </div>
          <div
            id="new-password-again"
            className="flex h-24 w-[40rem] flex-row items-center justify-center"
          >
            <p className="mr-4 w-36 text-right text-lg">비밀번호 확인</p>
            <input
              type="password"
              className="h-10 w-60 border-2"
              value={newPasswordAgain}
              onChange={handleNewPasswordAgain}
              placeholder="비밀번호를 다시 입력하세요."
            />
          </div>
          <div className="mt-20 flex flex-row justify-center gap-4">
            <button
              className={`h-10 w-20 rounded-md  text-white ${
                isPasswordMatch ? 'bg-mainBlue' : 'bg-placeholderGray'
              }`}
              aria-label="change password button"
              disabled={!isPasswordMatch}
              onClick={handlePasswordChange}
            >
              변경
            </button>
            <button
              onClick={handleModalClose}
              className="h-10 w-20 rounded-md bg-red-500 text-white"
              aria-label="cancel button"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePW;
