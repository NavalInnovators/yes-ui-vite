import SideBar from "../../components/sidebar/SideBar";
import Profile from "../../components/sidebar/Profile";
import SidebarButtons from "./SidebarButtons";
import Line from "../../components/Line";
import { CircleQuestionMark } from "lucide-react";

export default function ReviewerSidebar() {
  return (
    <SideBar>
      <div className="flex flex-col gap-[20px]">
        <Profile />
        <SidebarButtons />
      </div>

      {/* Support Button */}
      <div className="flex items-center gap-[10px] cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
        <CircleQuestionMark size={18} className="mt-[1px]" />
        <p className="text-[14px]">Support</p>
      </div>
    </SideBar>
  );
}
