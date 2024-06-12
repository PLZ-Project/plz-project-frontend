import VerticalLayout from '../layout/VerticalLayout';
import VerticalPost from './VerticalPost';

function VerticalView({ posts }) {
  return (
    <VerticalLayout>
      {posts.map((post) => (
        <VerticalPost
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
    </VerticalLayout>
  );
}

export default VerticalView;
