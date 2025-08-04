import YESIcon from "../../components/icons/YESIcon";
import FilterIcon from "../../components/icons/FilterIcon";
import DarkModeIcon from "../../components/icons/DarkModeIcon";
import NotificationsIcon from "../../components/icons/NotificationsIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import usePadding from "../../components/custom_hooks/usePadding";

export default function NavigationBar({ setIsMobileSidebarOpen }) {
  const padding = usePadding();

  return (
    <div
      className={`${padding} flex dark:bg-black dark:text-white text-black items-center h-[64px] gap-[10px] justify-between`}
    >
      <div className="flex items-center ">
        <div
          className="pl-[10px] ml-[-10px]"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <FilterIcon size={35} />
        </div>
        <YESIcon size={60} />
      </div>

      <div className="flex gap-[10px] items-center">
        <div className="p-[2px] transition-colors duration-100 hover:bg-light-hover dark:hover:bg-dark-hover rounded-full">
          <DarkModeIcon size={35} />
        </div>

        <div className="p-[2px] transition-colors duration-100 hover:bg-light-hover dark:hover:bg-dark-hover rounded-full">
          <NotificationsIcon size={35} />
        </div>

        <div className="p-[5px] transition-colors duration-100 hover:bg-light-hover dark:hover:bg-dark-hover rounded-full">
          <ProfileIcon size={38} />
        </div>
      </div>
    </div>
  );
}
