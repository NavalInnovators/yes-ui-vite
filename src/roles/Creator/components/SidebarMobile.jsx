import SideBar from "../../components/sidebar/SideBar";
import Profile from "../../components/sidebar/Profile";
import SidebarButtons from "./sidebar/SidebarButtons";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { forwardRef } from "react";

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

const SidebarMobile = forwardRef(({ setIsMobileSidebarOpen }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      className="absolute top-0 left-0 h-screen z-50"
    >
      <SideBar className="h-screen bg-[#fff] dark:bg-dark-card">
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
    </motion.div>
  );
});

SidebarMobile.displayName = "SidebarMobile";

export default SidebarMobile;
