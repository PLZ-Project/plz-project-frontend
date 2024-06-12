function Button({ width, height, children, type, onClick }) {
  // 공용 버튼을 만든다.
  // 버튼 컴포넌트는 props를 통해 크기와 안에 들어갈 내용을 받을수 있다.
  // 또한, 버튼의 종류는 안이 채워진 버튼과 테두리만 있는 버튼으로 나눌 수 있다.
  // 버튼의 종류는 props를 통해 받을 수 있다.
  // 버튼의 크기는 width와 height를 통해 받을 수 있으며, rem이기 때문에 px을 변환해야한다.
  // filled 의 유무에 따라, 배경색과 글자색을 변경한다.

  return (
    <button
      onClick={onClick}
      className={`w-[${width}rem] h-[${height}rem] ${
        type === 'filled' ? 'bg-mainBlue text-white' : 'border border-mainBlue text-mainBlue'
      } rounded-lg`}
    >
      {children}
    </button>
  );
}

export default Button;
