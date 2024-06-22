import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import AuthLogo from '../../src/assets/authlogo.svg?react';
import DiscordLogo from '../../src/assets/discord.svg?react';
import GoogleLogo from '../../src/assets/google.svg?react';
import { apiInstanceWithoutToken } from '../api/apiInstance';
import { isLoginAtom } from '../atoms/isLoginAtom';
import DynamicInput from '../components/common/DynamicInput';
import useInputValidator from '../hooks/useInputValidator';
import { connectSocket } from '../../utils/socket';

function SigninPage() {
  const navigate = useNavigate();
  const [email, , handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');

  const setIsLogin = useSetAtom(isLoginAtom);

  useEffect(() => {
    const login = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const responseDTO = urlParams.get('responseDTO');

      if (responseDTO) {
        const { accessToken, refreshToken, userInfo } = JSON.parse(responseDTO);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        const socket = connectSocket();
        await socket.emit('join_room', userInfo.id);

        setIsLogin(true);
        navigate('/main');
      }
    };

    login();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await apiInstanceWithoutToken
        .post('/auth/login', {
          email,
          password
        })
        .then(async (response) => {
          const { accessToken, refreshToken, userInfo } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          const socket = connectSocket();
          await socket.emit('join_room', userInfo.id);

          setIsLogin(true);
          navigate('/main');
        });
      setIsLogin(true);
      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignupButtonClick = () => {
    navigate('/signup');
  };

  const handleGoMain = () => {
    navigate('/main');
  };

  const handleDiscordLogin = async () => {
    try {
      window.location.href = 'https://plz-project.site/api/auth/discord';
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      await apiInstanceWithoutToken.post('/auth/google/callback', {
        tokenId: credentialResponse.credential
      }).then(async (response) => {
        const { accessToken, refreshToken, userInfo } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        const socket = connectSocket();
        await socket.emit('join_room', userInfo.id);

        setIsLogin(true);
        navigate('/main');
      });
      setIsLogin(true);
      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error(error);
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-auth bg-cover">
      <div className="absolute left-0 top-0 m-6" onClick={handleGoMain}>
        <AuthLogo className="size-20" />
      </div>
      <div className="flex w-[29rem] mt-16 flex-col items-center">
        <h1 className="mb-6 text-5xl text-white tracking-wide  text-opacity-85 text-[2.5rem] font-BlackHanSans font-thin">로그인</h1>
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
              className="text-white' h-[3.2rem] w-[20.625rem] tracking-wide rounded-lg mt-2 font-NotoSansKR text-[15px] bg-blue-900 text-white"
            >
              로그인
            </button>
          </form>
          <div className="mt-6 flex flex-row justify-center gap-6">
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
              <DiscordLogo onClick={handleDiscordLogin} />
            </button>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <p className="mr-2 font-NotoSansKR text-[0.9rem] text-white">아직 회원이 아니시라면?</p>
            <button onClick={handleSignupButtonClick} className="font-semibold -mt-0.02 text-[0.9rem] font-NotoSansKR text-yel">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
