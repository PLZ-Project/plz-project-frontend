import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Button from '../common/Button';
import BoardList from './BoardList';
import Profile from './Profile';
import { isLoginAtom } from '../../atoms/isLoginAtom';

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
      <div className="mt-5 flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-60">
        <div className=" flex h-[6.5rem] w-80 items-center justify-center">
          {isLogin === true ? (
            <button
              onClick={handlePostButtonClick}
              className="font-GowunDodum h-16 w-72 rounded-lg bg-yel bg-opacity-85 text-[1.2rem] font-medium text-white"
            >
              글쓰기
            </button>
          ) : (
            <button
              onClick={handleLoginButtonClick}
              className="h-16 w-40 rounded-lg bg-yel text-white"
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
