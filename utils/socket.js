import io from 'socket.io-client';

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io('https://plz-project.site', { transports: ['websocket'] });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('new_notification', (notification) => {
      console.log('New notification received:', notification);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('connect_timeout', () => {
      console.error('Socket connection timeout');
    });
  }

  return socket;
};
