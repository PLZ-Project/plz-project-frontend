import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  // const [cookie] = useCookies(['accessToken', 'refreshToken', 'userInfo']);

  const handleLoginBtn = () => {
    navigate('/login');
  };

  const handleMainBtn = () => {
    navigate('/main');
  };
  return (
    <div
      className="flex h-svh w-svw items-center bg-cover bg-left"
      style={{ backgroundImage: "url('./src/assets/landing.webp" }}
    >
      <div className="-mt-4 ml-48 flex flex-col justify-center">
        <div className="flex flex-col items-start">
          <div className="absolute left-40 top-[19rem] size-20 rounded-[10rem] bg-[#4d0101]"></div>
          <span className="font-BlackHanSans z-10 mb-[0.4rem] ml-2 mt-12 text-7xl text-white opacity-80">
            PlayerZ
          </span>
          <span className="font-NotoSansKR mt-4 rounded-xl bg-white bg-opacity-70 px-5 py-2 text-[1.1rem] text-black">
            플레이어즈는 게임을 좋아하는 사람들을 위해 존재하는 커뮤니티입니다.
          </span>
          <span className="font-NotoSansKR mt-3 rounded-xl bg-white bg-opacity-70 px-5 py-2 text-[1.1rem] text-black">
            사람들과 소통하며 게임의 즐거움을 더욱 누려보세요!!
          </span>
        </div>
        <div className="mt-5 flex h-[4.1rem]">
          <button
            className="font-NotoSansKR w-[50%] rounded-xl bg-blue-950 bg-opacity-60 px-4 pb-[1.45rem] pt-5 text-center text-[1.1rem] text-white"
            onClick={handleLoginBtn}
          >
            로그인을 하시겠어요?
          </button>
          <button
            className="font-NotoSansKR ml-3 w-[16.2rem] w-[50%] rounded-xl bg-blue-950 bg-opacity-60 px-4 pb-[1.45rem] pt-5 text-center text-[1.1rem] text-white"
            onClick={handleMainBtn}
          >
            메인 페이지로 이동합니다.
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
