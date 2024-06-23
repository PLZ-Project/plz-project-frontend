import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscLinkExternal } from 'react-icons/vsc';
import { connectSocket } from '../../../utils/socket';
import { apiInstanceWithoutToken } from '../../api/apiInstance';

function AlertDropdown({ toggleDropdown }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const userId = JSON.parse(localStorage.getItem('userInfo')).id;
      const response = await apiInstanceWithoutToken.get(`/notification/${userId}`);
      setNotifications(response.data.notifications);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const title = (title) => {
    const name = title.length < 5 ? title : `${title.slice(0, 5)}...`;
    return name;
  };

  const writeContent = (notification) => {
    switch (notification.type) {
      case 'comment':
        return `${title(notification.Article.title)}에 댓글이 달렸습니다.`;
      case 'tag':
        return `${title(notification.Article.title)}에 태그되셨습니다.`;
      case 'like':
        return `${title(notification.Article.title)}에 좋아요가 눌렸습니다.`;
      default:
        return '';
    }
  };

  const handleURLClick = (id) => {
    navigate(`/post/${id}`);
  };

  const clickOutside = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        toggleDropdown();
      }
    },
    [dropdownRef, toggleDropdown]
  );

  useEffect(() => {
    const socket = connectSocket();
    socket.on('new_notification', (data) => {
      fetchNotifications();
    });

    fetchNotifications();

    return () => {
      socket.off('new_notification');
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-2 top-20 z-[100] flex h-[30rem] w-80 flex-col bg-black bg-opacity-50"
    >
      <div id="alertList" className="scrollbar-hide h-auto flex-col overflow-y-auto">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notifications.</p>}
        {!isLoading &&
          !isError &&
          notifications.map((notification, index) => (
            <div
              key={index}
              className="notification-item mx-2 mt-2 flex h-10 flex-row items-center justify-between rounded-sm bg-white px-2 text-black shadow-sm shadow-gray-400"
            >
              {writeContent(notification)}
              <button
                onClick={() => handleURLClick(notification.articleId)}
                aria-label="link button"
              >
                <VscLinkExternal />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AlertDropdown;
