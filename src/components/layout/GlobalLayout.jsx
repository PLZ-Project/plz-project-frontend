import Banner from '../common/Banner';
import Header from '../common/Header';

function GlobalLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-72px)] w-full flex-row justify-center bg-bgGray">
        <Banner />
        <div className="z-10 mt-28 flex flex-row gap-2">{children}</div>
      </div>
    </div>
  );
}
