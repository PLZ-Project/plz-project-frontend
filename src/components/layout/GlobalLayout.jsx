import Banner from '../common/Banner';
import Header from '../common/Header';

function GlobalLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-72px)] w-1440 flex-row justify-center ">
        <Banner />
        <div className="z-10 mt-[25rem] flex flex-row gap-4">{children}</div>
      </div>
    </div>
  );
}

export default GlobalLayout;
