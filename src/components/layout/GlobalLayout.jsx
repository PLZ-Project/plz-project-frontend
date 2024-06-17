import Banner from '../common/Banner';
import Header from '../common/Header';

function GlobalLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-72px)] w-1440 flex-row justify-center bg-banner2 bg-cover bg-opacity-100 overflow-hidden bg-no-repeat">
        {/* <Banner /> */}
        <div className="z-10 mt-28 flex flex-row gap-4">{children}</div>
      </div>
    </div>
  );
}

export default GlobalLayout;
