import { userNickName } from '../../../utils/userNickname';
import HorizontalLayout from '../layout/HorizontalLayout';
import HorizontalPost from './HorizontalPost';

function HorizontalView({ posts }) {
  const convertDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <HorizontalLayout>
      {posts.map((post) => (
        <HorizontalPost
          key={post.id}
          id={post.id}
          board={post.Board.name}
          likes={post.Likes.length}
          title={post.title}
          views={post.hit}
          date={convertDate(post.createdAt)}
          writer={userNickName(post.User.nickname)}
        />
      ))}
    </HorizontalLayout>
  );
}

export default HorizontalView;
