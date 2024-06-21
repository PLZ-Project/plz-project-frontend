function Banner() {
  // 배너에는 사진이 들어가고, 사진은 src/assets 폴더에 존재한다.
  // 크기는 1440*200이다.
  return (
    <div className="fixed z-10 flex w-full h-[32rem] items-center justify-center bg-default-img bg-cover bg-opacity-100 overflow-hidden bg-no-repeat">
    </div>
  );
}

export default Banner;
