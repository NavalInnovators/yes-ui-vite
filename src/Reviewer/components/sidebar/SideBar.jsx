import Profile from "./Profile";
import SidebarButtons from "./SidebarButtons";

export default function SideBar() {
  return (
    <div className="w-[265px] min-h-[calc(100vh-74px-77.5px)] dark:bg-black border-r-[1px] dark:text-white border-light-border dark:border-r-dark-border flex flex-col gap-[20px] px-[20px] font-light text-gray-500 py-[20px]">
      <Profile />

      <SidebarButtons />
    </div>
  );
}
