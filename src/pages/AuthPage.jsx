import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg?react';
import SignupSection from '../components/auth/SignupSection';
import LoginSection from '../components/auth/LoginSection';

function AuthPage() {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };
  return (
    <div className="flex h-[1024px] w-full flex-col items-center justify-center gap-4 bg-default-img bg-cover">
      <div className="absolute inset-0 z-0 bg-black bg-default-img opacity-20 blur-3xl"></div>
      <div className="z-10 mb-10">
        <button id="logo" onClick={goToMain} aria-label="main button">
          <Logo width={120} height={120} />
        </button>
      </div>
      <div className="z-10 flex flex-row">
        <SignupSection />
        <div className="mx-10 my-1 h-[32rem] border border-white"></div>
        <LoginSection />
      </div>
    </div>
  );
}

export default AuthPage;
