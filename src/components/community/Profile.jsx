import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem('userInfo'));
  const { nickname } = userinfo;
  const { email } = userinfo;

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
    <div className=" relative flex flex-col h-auto items-center justify-center rounded-t-1x">
      <div className="-pb-5 w-80 flex flex-col items-center justify-center gap-6 rounded-2xl">
        <img src="/src/assets/shibaDog.png" className="h-72 w-80 rounded-t-lg" />
      </div>
      <div className="flex flex-col items-center w-80 h-32 justify-center px-7 pt-3 z-[1] rounded-b-lg bg-black bg-opacity-80 content-['']">
        <p className="relative flex flex-col -mt-2 gap-2 font-BebasNeue mb-5 text-white  text-[1.5rem] text-opacity-90 font-medium tracking-wide">
          {userNickName().toUpperCase()}
        </p>
        <p className="-mt-[1.1rem] px-2 py-[0.1rem] text-white font-GowunDodum">{email}</p>
        <button onClick={goToMyPage} className="text-yel h-12 w-[9.6rem] py-1 font-IBMPlexSansKR font-medium text-center text-[1rem]">
          수정
        </button>
      </div>
    </div>
  );
}

export default Profile;
