import HorizontalLayout from '../layout/HorizontalLayout';
import HorizontalPost from './HorizontalPost';

function HorizontalView({ posts }) {
  // rows 구조
  // rows = [
  // {
  // Board : { name : 게시판 이름 },
  // Comments : [ 댓글 데이터 배열 ],
  // Likes : [ 좋아요 데이터 배열 ],
  // User : { nickname : 작성자 닉네임 },
  // content : str 형식의 html,
  // createdAt : "2024-06-17T01:18:27.664Z" 형식의 str,
  // hit : 조회수,
  // title : 제목,
  // id : 포스트 id
  // }

  // "2024-06-17T01:18:27.664Z" 와 같이 들어오는 createdAt을
  // YY-MM-DD 형식의 str로 변환하는 함수
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
          writer={post.User.nickname}
        />
      ))}
    </HorizontalLayout>
  );
}

export default HorizontalView;
