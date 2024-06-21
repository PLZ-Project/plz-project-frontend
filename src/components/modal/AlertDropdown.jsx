import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('/socket.io');

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
      const response = await axios.get(`/api/notification/${userId}`);
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
      default:
        return '';
    }
  };

  const handleURLClick = (id) => {
    navigate(`/post/${id}`);
  };

  const clickOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      toggleDropdown();
    }
  }, [dropdownRef, toggleDropdown]);

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [clickOutside]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    socket.emit('join_room', `user_${userId}`);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('new_notification', (data) => {
      console.log('새로운 알림이 도착했습니다:', data);
      fetchNotifications(); // 새로운 알림을 받으면 알림 목록을 다시 가져옵니다.
    });

    return () => {
      socket.off('new_notification');
    };
  }, []);

  useEffect(() => {
    fetchNotifications(); // 컴포넌트가 마운트되면 알림 목록을 가져옵니다.
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-2 top-20 z-[100] flex h-[30rem] w-80 flex-col bg-black bg-opacity-50"
    >
      <div id="alertList" className="h-60 overflow-hidden text-white">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notifications.</p>}
        {!isLoading && !isError && notifications.map((notification, index) => (
          <div key={index} onClick={() => handleURLClick(notification.articleId)} className="notification-item">
            {writeContent(notification)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertDropdown;
