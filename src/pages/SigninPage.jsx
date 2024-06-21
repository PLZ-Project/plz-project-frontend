import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import DynamicInput from '../components/common/DynamicInput';
import useInputValidator from '../hooks/useInputValidator';
import { isLoginAtom } from '../atoms/isLoginAtom';
import GoogleLogo from '../../src/assets/google.svg?react';
import DiscordLogo from '../../src/assets/discord.svg?react';
import AuthLogo from '../../src/assets/authlogo.svg?react';
import { OAuthInstance, apiInstanceWithoutToken } from '../api/apiInstance';

function SigninPage() {
  const navigate = useNavigate();
  const [email, , handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');

  const setIsLogin = useSetAtom(isLoginAtom);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await apiInstanceWithoutToken
        .post('/auth/login', {
          email,
          password
        })
        .then((response) => {
          const { accessToken, refreshToken, userInfo } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLogin(true);
          navigate('/');
        });
      setIsLogin(true);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignupButtonClick = () => {
    navigate('/signup');
  };

  // const handleGoogleLoginResponse = (response) => {
  //   if (response.isSuccess === true) {
  //     // 토큰 저장
  //     localStorage.setItem('accessToken', response.accessToken);
  //     localStorage.setItem('refreshToken', response.refreshToken);
  //     localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
  //     // 사용자 정보 활용
  //     // const { id, email, nickname, role } = response.userInfo;
  //     // 사용자 프로필 페이지 등 구현
  //     setIsLogin(true);
  //     navigate('/');
  //   } else {
  //     // 로그인 실패 처리
  //     console.error('Google login failed:', response);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   window.location.href = 'https://plz-project.site/api/auth/google';
  //   // 백엔드 서버로부터 응답을 받으면 handleGoogleLoginResponse 함수를 호출
  //   const response = await fetch('https://plz-project.site/api/auth/google/callback')
  //     .then((res) => res.json())
  //     .catch((err) => console.error('Error:', err));
  //   handleGoogleLoginResponse(response);
  const handleLoginSuccess = async (credenitalResponse) => {
    console.log(credenitalResponse);
    try {
      const url = '/o/oauth2/v2/auth';

      const res = await OAuthInstance.get(url, {
        params: {
          client_id: '523405884505-gg96ji9js5qb6tkuq906ckhcnqre737e.apps.googleusercontent.com',
          redirect_uri: 'https://plz-project.site/api/auth/google/callback',
          response_type: 'code',
          scope: 'email profile'
        }
      });
      console.log('백엔드 응답:', res.data);
      // localStorage.setItem('accessToken', res.data.accessToken);
      // localStorage.setItem('refreshToken', res.data.refreshToken);
      // localStorage.setItem('userInfo', JSON.stringify(res.data.user));
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('로그인 실패:', error);
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
        <h1 className="font-semiboldbold mb-10 text-4xl text-white text-opacity-85">로그인</h1>
        <div>
          <form className="flex flex-col gap-2">
            <DynamicInput
              label="이메일"
              value={email}
              type="text"
              placeholder="이메일을 입력해주세요"
              onChange={handleEmailChange}
            />
            <DynamicInput
              label="비밀번호"
              value={password}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
            />
            {password && !isPasswordValid && (
              <div className="ml-2 text-xs text-yel">
                숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="text-white' h-12 w-[20.625rem] rounded-lg bg-mainBlue text-white"
            >
              로그인
            </button>
          </form>
          <div className="mt-4 flex flex-row justify-center gap-6">
            <button aria-label="구글 로그인">
              <GoogleOAuthProvider clientId="523405884505-gg96ji9js5qb6tkuq906ckhcnqre737e.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                  text="구글로 로그인"
                >
                  <GoogleLogo />
                </GoogleLogin>
              </GoogleOAuthProvider>
            </button>
            <button aria-label="디스코드 로그인">
              <DiscordLogo />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <p className="mr-2 text-white">아직 회원이 아니시라면?</p>
            <button onClick={handleSignupButtonClick} className="font-semibold text-yel">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
