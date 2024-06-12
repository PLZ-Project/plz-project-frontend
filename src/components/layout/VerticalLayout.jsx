function VerticalLayout({ children }) {
  return (
    <div className="ml-2 grid grid-cols-3 grid-rows-3 place-items-center gap-x-0">{children}</div>
  );
}

export default VerticalLayout;
