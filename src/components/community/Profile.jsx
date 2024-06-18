import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem('userInfo'));
  const nickname = userinfo.nickname;
  const email = userinfo.email;

  const userNickName = () => {
    const regex = /^(.*shibaDog\d{0,4}).*/;
    const match = nickname.match(regex);
    const name = match ? match[1] : nickname.replace(/^\d{0,4}/, '').slice(0, 12);
    return name;
  };

  const goToMyPage = () => {
    navigate('/userinfo');
  };
  return (
    <div className="w-82 relative z-[2] flex h-auto flex-col items-center justify-center rounded-t-2xl bg-white">
      <div className="z-[2] mx-6 mt-10 flex flex-col items-center justify-center gap-6">
        <img src="/src/assets/dva.png" className="h-24 w-24 rounded-full" />
        <p className="relative flex flex-col gap-2 text-2xl">
          {userNickName()}
          <span onClick={goToMyPage} className="bg-sky rounded-2xl px-2 py-1 text-center text-xs">
            수정
          </span>
        </p>
        <p className="mb-2 text-opacity-50">{email}</p>
      </div>
      <div className="absolute bottom-0 left-0 z-[1] block h-[8.25rem] w-full bg-[#daefff] content-['']"></div>
    </div>
  );
}

export default Profile;
