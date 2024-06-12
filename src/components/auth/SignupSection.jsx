import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useInputValidator from '../../hooks/useInputValidator';
import DynamicInput from '../common/DynamicInput';
import Button from '../common/Button';
import { apiInstanceWithoutToken } from '../../api/apiInstance';

function SignupSection() {
  const [email, isEmailValid, handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');
  const [passwordCheck, isPasswordCheckValid, handlePasswordCheckChange] = useInputValidator(
    '',
    'passwordCheck',
    password
  );
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="flex h-[32.5rem] flex-col items-center rounded-2xl border-2 border-black bg-white p-8">
      <h1 className="mb-10 text-4xl font-bold">회원가입</h1>
      <div>
        <form className="flex flex-col gap-3">
          <DynamicInput
            label="이메일"
            value={email}
            type="text"
            isValid={isEmailValid}
            placeholder="이메일을 입력해주세요"
            onChange={handleEmailChange}
          />
          {!isEmailValid ? (
            <div className="text-xs text-red-400">이메일 형식이 올바르지 않습니다.</div>
          ) : (
            <div className="text-xs text-mainBlue">이메일 형식이 올바릅니다.</div>
          )}
          <DynamicInput
            label="비밀번호"
            value={password}
            type="password"
            isValid={isPasswordValid}
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          {!isPasswordValid ? (
            <div className="text-xs text-red-400">
              숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.
            </div>
          ) : (
            <div className="text-xs text-mainBlue">비밀번호가 일치합니다.</div>
          )}
          <DynamicInput
            label="비밀번호 확인"
            value={passwordCheck}
            type="password"
            isValid={isPasswordCheckValid}
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheckChange}
          />
          {!isPasswordCheckValid ? (
            <div className="text-xs text-red-400">비밀번호가 일치하지 않습니다.</div>
          ) : (
            <div className="text-xs text-mainBlue">비밀번호가 일치합니다.</div>
          )}
          <Button
            width={17.25}
            height={3.125}
            type="filled"
            isValid={!isValid}
            onClick={handleSignupSubmit}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignupSection;
