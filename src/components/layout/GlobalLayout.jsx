import Header from '../common/Header';
import SideMenu from '../community/SideMenu';

function GlobalLayout({ children }) {
  return (
    <div className="bg-board bg-cover">
      <Header />
      <div className="flex h-[calc(100rem-72px)] w-full flex-row justify-center bg-cover">
        {/* <Banner /> */}
        <div className="z-10 mt-40 flex flex-row gap-4">
          <SideMenu />
          {children}
        </div>
      </div>
    </div>
  );
}

export default GlobalLayout;
