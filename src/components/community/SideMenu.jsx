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
      <Profile />
      <div className="bg-sky flex h-[6.5rem] w-[20.5rem] items-center justify-center border-y border-placeholderGray">
        {isLogin === true ? (
          <button
            onClick={handleLoginButtonClick}
            className="h-[3.5rem] w-[10rem] rounded-lg bg-mainBlue text-white"
          >
            글쓰기
          </button>
        ) : (
          <button
            onClick={handlePostButtonClick}
            className="h-[3.5rem] w-[10rem] rounded-lg bg-mainBlue text-white"
          >
            로그인
          </button>
        )}
      </div>
      <BoardList />
    </div>
  );
}

export default SideMenu;
