import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../common/Button';
import BoardList from './BoardList';
import Profile from './Profile';

function SideMenu() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const handleLoginButtonClick = () => {
    navigate('/auth');
  };
  const handlePostButtonClick = () => {
    navigate('/post');
  };

  return (
    <div className="flex flex-col">
      <Profile />
      <div className="flex h-[5.5rem] w-[20.5rem] items-center justify-center border-y border-placeholderGray bg-white">
        {isLogin ? (
          <Button
            width={19.5}
            height={4.5}
            type="filled"
            rounded="round"
            onClick={handlePostButtonClick}
          >
            글쓰기
          </Button>
        ) : (
          <Button
            width={19.5}
            height={4.5}
            type="filled"
            rounded="round"
            onClick={handleLoginButtonClick}
          >
            로그인
          </Button>
        )}
      </div>

      <BoardList />
    </div>
  );
}

export default SideMenu;
