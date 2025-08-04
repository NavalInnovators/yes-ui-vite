import YESIcon from "../../components/icons/YESIcon";
import FilterIcon from "../../components/icons/FilterIcon";
import DarkModeIcon from "../../components/icons/DarkModeIcon";
import NotificationsIcon from "../../components/icons/NotificationsIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";

export default function NavigationBar() {
  return (
    <div className="flex dark:bg-black dark:text-white text-black items-center h-[64px] gap-[10px] justify-between py-[20px] px-[25px]">
      <div className="flex items-center ">
        <FilterIcon size={35} />
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
