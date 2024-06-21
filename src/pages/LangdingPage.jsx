import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  // 메인페이지로 이동하면, 쿠키에 저장된 토큰과 유저정보를 localStorage에 저장한다.
  // 이후, localStorage에 저장된 토큰과 유저정보를 이용하여 로그인 여부를 판단한다.

  const navigate = useNavigate();

  const [cookie] = useCookies(['accessToken', 'refreshToken', 'userInfo']);

  const handleLoginBtn = () => {
    navigate('/login');
  };

  const handleMainBtn = () => {
    navigate('/main');
  };

  return (
    <div className="bg-landing w-svw h-svh bg-cover bg-left flex items-center">
      <div className="ml-48 flex flex-col justify-center -mt-4">
        <div className="flex flex-col items-start">
          <div style={{ borderRadius: '10rem', backgroundColor: '#4d0101', width: '5rem', height: '5rem', position: 'absolute', left: '10rem', top: '19rem' }}></div>
          <span className="font-BlackHanSans text-white text-7xl opacity-80 z-10 mt-12 mb-[0.4rem] ml-2">PlayerZ</span>
          <span className="font-NotoSansKR text-black mt-4 text-[1.1rem] bg-white bg-opacity-70 px-5 py-2 rounded-xl">플레이어즈는 게임을 좋아하는 사람들을 위해 존재하는 커뮤니티입니다.</span>
          <span className="font-NotoSansKR text-black text-[1.1rem] bg-white bg-opacity-70 mt-3 px-5 py-2 rounded-xl">사람들과 소통하며 게임의 즐거움을 더욱 누려보세요!!</span>
        </div>
        <div className="flex mt-5 h-[4.1rem]">
          <span className="font-NotoSansKR text-[1.1rem] text-white w-[50%] text-center bg-opacity-60 bg-blue-950 pt-5 pb-[1.45rem] px-4 rounded-xl" onClick={handleLoginBtn}>로그인을 하시겠어요?</span>
          <span className="font-NotoSansKR text-[1.1rem] text-white w-[16.2rem] ml-3 w-[50%] text-center bg-opacity-60 bg-blue-950 pt-5 pb-[1.45rem] px-4 rounded-xl" onClick={handleMainBtn}>메인 페이지로 이동합니다.</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
