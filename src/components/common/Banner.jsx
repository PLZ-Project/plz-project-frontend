function Banner() {
  // 배너에는 사진이 들어가고, 사진은 src/assets 폴더에 존재한다.
  // 크기는 1440*200이다.
  return (
    <div className="fixed z-10 flex h-full w-full items-center justify-center">
      <img src="/src/assets/banner2.png" alt="banner" className="w-full object-cover" />
    </div>
  );
}

export default Banner;
