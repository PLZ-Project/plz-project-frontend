import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../../api/apiInstance';
// import { apiInstance } from '../../api/api';

function ChangePW({ toggleModal }) {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
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
      navigate('/main');
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
                isPasswordMatch ? 'bg-yel' : 'bg-placeholderGray'
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
