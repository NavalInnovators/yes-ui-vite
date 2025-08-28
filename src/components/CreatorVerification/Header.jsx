import { NavLink } from "react-router-dom";
import YESIcon from "../../roles/components/icons/YESIcon";
import StandaloneDarkModeIcon from "../../roles/components/icons/StandaloneDarkModeIcon";
import NotificationsIcon from "../../roles/components/icons/NotificationsIcon";
import ProfileImage from "../../roles/components/ProfileImage";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center text-[13px] px-[20px] py-[10px]">
      <div>
        <YESIcon size={60} />
      </div>

      <div className="flex items-center gap-[10px]">
        <div className="flex items-center gap-[10px] text-gray-500 mr-[20px]">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/company">Company</NavLink>
          <NavLink to="/membership">Membership</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/career">Career</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
        </div>

        <div className="flex items-center gap-[15px]">
          <Search size={17} className="dark:text-white" />
          <StandaloneDarkModeIcon size={30} />
          <NotificationsIcon size={30} className="relative right-[10px]" />
        </div>

        <ProfileImage size={33} />
      </div>
    </header>
  );
}
