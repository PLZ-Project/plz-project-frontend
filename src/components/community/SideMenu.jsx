import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { isLoginAtom } from '../../atoms/isLoginAtom';
import BoardList from './BoardList';
import Profile from './Profile';

function SideMenu() {
  const navigate = useNavigate();
  const isLogin = useAtom(isLoginAtom)[0];
  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  const handlePostButtonClick = () => {
    navigate('/post');
  };

  return (
    <div className="flex flex-col">
      {isLogin && <Profile />}
      <div className="flex flex-col justify-center items-center rounded-lg bg-white bg-opacity-60 mt-5">
        <div className=" flex h-[6.5rem] w-80 items-center justify-center">
          {isLogin === true ? (
            <button
              onClick={handlePostButtonClick}
              className="h-16 w-72 bg-black bg-opacity-85 text-white font-medium font-GowunDodum rounded-lg text-[1.2rem]"
            >
              글쓰기
            </button>
          ) : (
            <button
              onClick={handleLoginButtonClick}
              className="h-16 w-40 rounded-lg bg-black text-white"
            >
              로그인
            </button>
          )}
        </div>
        <BoardList />
      </div>
    </div>
  );
}

export default SideMenu;
