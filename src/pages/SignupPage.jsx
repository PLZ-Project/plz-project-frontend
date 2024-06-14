import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useInputValidator from '../hooks/useInputValidator';
import DynamicInput from '../components/common/DynamicInput';
import Button from '../components/common/Button';
import AuthLogo from '../../src/assets/authlogo.svg?react';
import { apiInstanceWithoutToken } from '../api/apiInstance';

function SignupPage() {
  const [email, isEmailValid, handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');
  const [passwordCheck, isPasswordCheckValid, handlePasswordCheckChange] = useInputValidator(
    '',
    'passwordCheck',
    password
  );
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const handleSigninButtonClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    setIsValid(isEmailValid && isPasswordValid && isPasswordCheckValid);
  }, [isEmailValid, isPasswordValid, isPasswordCheckValid]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    // 회원가입 API 호출
    try {
      await apiInstanceWithoutToken.post('/user', {
        email,
        password
      });
      // navigate('/');
      console.log('회원가입 성공??');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const handleGoMain = () => {
    navigate('/');
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-auth-img object-cover">
      <div className="absolute left-0 top-0 m-6" onClick={handleGoMain}>
        <AuthLogo />
      </div>
      <div className="flex w-[29rem] flex-col items-center">
        <h1 className="font-semiboldbold mb-10 text-4xl text-white text-opacity-85">회원가입</h1>
        <div>
          <form className="flex flex-col gap-2">
            <DynamicInput
              label="이메일"
              value={email}
              type="text"
              isValid={isEmailValid}
              placeholder="이메일을 입력해주세요"
              onChange={handleEmailChange}
            />
            {email && !isEmailValid && (
              <div className="text-xs text-yel">이메일 형식이 올바르지 않습니다.</div>
            )}
            <DynamicInput
              label="비밀번호"
              value={password}
              type="password"
              isValid={isPasswordValid}
              placeholder="비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
            />
            {password && !isPasswordValid && (
              <div className="text-xs text-yel">
                숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.
              </div>
            )}
            <DynamicInput
              label="비밀번호 확인"
              value={passwordCheck}
              type="password"
              isValid={isPasswordCheckValid}
              placeholder="비밀번호 확인"
              onChange={handlePasswordCheckChange}
            />
            {passwordCheck && !isPasswordCheckValid && (
              <div className="text-xs text-yel">비밀번호가 일치하지 않습니다.</div>
            )}
            <button
              onClick={handleSignupSubmit}
              className="text-white' h-12 w-[20.625rem] rounded-lg bg-mainBlue text-white"
            >
              회원가입
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center">
            <p className="mr-2 text-white">아직 회원이 아니시라면?</p>
            <button onClick={handleSigninButtonClick} className="font-semibold text-yel">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
