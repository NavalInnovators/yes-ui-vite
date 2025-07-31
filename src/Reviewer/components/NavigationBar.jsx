import YESIcon from "../icons/YESIcon";
import FilterIcon from "../icons/FilterIcon";
import DarkModeIcon from "../icons/DarkModeIcon";
import NotificationsIcon from "../icons/NotificationsIcon";
import ProfileIcon from "../icons/ProfileIcon";

export default function NavigationBar() {
  return (
    <div className="flex dark:bg-black dark:text-white text-black items-center h-[74px] gap-[10px] justify-between py-[20px] px-[25px]">
      <div className="flex items-center ">
        <FilterIcon />
        <YESIcon />
      </div>

      <div className="flex gap-[20px] items-center">
        <div className="p-[2px] hover:bg-light-hover dark:hover:bg-dark-hover rounded-full">
          <DarkModeIcon />
        </div>

        <div className="p-[2px] hover:bg-light-hover dark:hover:bg-dark-hover rounded-full">
          <NotificationsIcon />
        </div>

        <div>
          <ProfileIcon size={21} />
        </div>
      </div>
    </div>
  );
}
