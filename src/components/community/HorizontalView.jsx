import HorizontalLayout from '../layout/HorizontalLayout';
import HorizontalPost from './HorizontalPost';

function HorizontalView({ posts }) {
  return (
    <HorizontalLayout>
      {posts.map((post) => (
        <HorizontalPost
          key={post.id}
          id={post.id}
          board={post.board}
          likes={post.likes}
          title={post.title}
          views={post.views}
          date={post.date}
          writer={post.writer}
        />
      ))}
    </HorizontalLayout>
  );
}

export default HorizontalView;
