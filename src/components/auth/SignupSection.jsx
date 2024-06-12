import { useNavigate } from 'react-router-dom';
import useInputValidator from '../../hooks/useInputValidator';
import DynamicInput from '../common/DynamicInput';
import Button from '../common/Button';

function SignupSection() {
  const [email, isEmailValid, handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');
  const [passwordCheck, isPasswordCheckValid, handlePasswordCheckChange] = useInputValidator(
    '',
    'passwordCheck'
  );

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
          <Button width={17.25} height={3.125} type="filled">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignupSection;
