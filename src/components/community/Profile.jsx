import { useNavigate } from 'react-router-dom';
import { userNickName } from '../../../utils/userNickname';

function Profile() {
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem('userInfo'));
  const { nickname, email } = userinfo;

  const goToMyPage = () => {
    navigate('/userinfo');
  };
  return (
    <div className=" rounded-t-1x relative flex h-auto flex-col items-center justify-center">
      <div className="-pb-5 flex w-80 flex-col items-center justify-center gap-6 rounded-2xl">
        <img
          src="/src/assets/shibaDog.png"
          className="h-72 w-80 rounded-t-lg"
          alt="profile image"
        />
      </div>
      <div className="z-[1] flex h-32 w-80 flex-col items-center justify-center rounded-b-lg bg-black bg-opacity-80 px-7 pt-3 content-['']">
        <p className="font-BebasNeue relative -mt-2 mb-5 flex flex-col gap-2 text-[1.5rem]  font-medium tracking-wide text-white text-opacity-90">
          {userNickName(nickname).toUpperCase()}
        </p>
        <p className="font-GowunDodum -mt-[1.1rem] px-2 py-[0.1rem] text-white">{email}</p>
        <button
          onClick={goToMyPage}
          className="font-IBMPlexSansKR h-12 w-[9.6rem] py-1 text-center text-[1rem] font-medium text-yel"
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default Profile;
