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
      <Profile />
      <div className="bg-slate-100 flex h-[6.5rem] w-[20.5rem] items-center justify-center border-y border-placeholderGray">
        {isLogin === true ? (
          <button
            onClick={handlePostButtonClick}
            className="h-14 w-[48%] bg-blue-950 text-white"
          >
            글쓰기
          </button>
        ) : (
          <button
            onClick={handleLoginButtonClick}
            className="h-14 w-40 rounded-lg bg-mainBlue text-white"
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
