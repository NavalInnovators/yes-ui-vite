export default function SideBar({ children }) {
  return (
    <div className="w-[236px] justify-between min-h-[calc(100vh-64px-63px)] dark:bg-black border-r-[1px] dark:text-white border-light-border dark:border-r-dark-border flex flex-col gap-[15px] px-[20px] font-light text-gray-500 py-[20px]">
      {children}
    </div>
  );
}
