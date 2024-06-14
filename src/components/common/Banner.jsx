function Banner() {
  // 배너에는 사진이 들어가고, 사진은 src/assets 폴더에 존재한다.
  // 크기는 1440*200이다.
  return (
    <div className="fixed z-10 flex w-full items-center justify-center">
      <img src="/src/assets/banner.jpg" alt="banner" className="h-96 w-full object-cover" />
    </div>
  );
}

export default Banner;
