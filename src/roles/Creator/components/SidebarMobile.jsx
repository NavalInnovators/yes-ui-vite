import SideBar from "../../components/sidebar/SideBar";
import Profile from "../../components/sidebar/Profile";
import SidebarButtons from "./sidebar/SidebarButtons";
import Line from "../../components/Line";
import { ArrowLeft } from "lucide-react";

function CloseButton({ setIsMobileSidebarOpen }) {
  return (
    <div
      className="cursor-pointer w-fit bg-light-card rounded-full p-[8px] dark:bg-dark-highlight dark:hover:bg-dark-more-highlighted hover:bg-light-hover"
      onClick={() => setIsMobileSidebarOpen(false)}
    >
      <ArrowLeft size={24} className="text-gray-500 dark:text-white" />
    </div>
  );
}

export default function SidebarMobile({ setIsMobileSidebarOpen }) {
  return (
    <SideBar className="absolute top-0 left-0 h-screen z-50 bg-[#fff]">
      {/* Close Button */}
      <div className="flex items-center justify-end">
        <CloseButton setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
      </div>

      <div className="relative flex flex-col h-full">
        <div className="flex flex-col gap-[20px] mt-[10%]">
          <Profile />
          <SidebarButtons />
        </div>
      </div>
    </SideBar>
  );
}
