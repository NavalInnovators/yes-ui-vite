import { LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function ProfileHoverCard() {
  return (
    <motion.div
      initial={{ scale: 0, y: "-90px", x: "125px" }}
      animate={{ scale: 1, y: 0, x: 0 }}
      exit={{ scale: 0, y: "-90px", x: "125px" }}
      className="absolute top-[50px] dark:bg-dark-card dark:shadow-[0px_0px_5px_rgba(255,255,255,0.4)] shadow-[0px_0px_5px_0px_#9e9e9e] dark:text-white text-gray-700 right-[0] rounded-[7px] flex flex-col bg-[#fff] w-[300px]"
    >
      <div className="flex items-center gap-[20px] rounded-[7px] p-[20px] hover:bg-light-card dark:hover:bg-dark-highlight">
        <LayoutDashboard size={25} />
        <p className="text-[16px]">Dashboard</p>
      </div>

      <div className="flex items-center gap-[20px] rounded-[7px] p-[20px] hover:bg-light-card dark:hover:bg-dark-highlight">
        <LogOut size={25} />
        <p className="text-[16px]">Logout</p>
      </div>
    </motion.div>
  );
}

export default function ProfileIcon({ size }) {
  const [openProfileCard, setOpenProfileCard] = useState(false);

  function handleProfileClick() {
    setOpenProfileCard((prev) => !prev);
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleProfileClick}
      className="relative"
    >
      <img
        style={{ width: size * 2, borderRadius: "100%" }}
        src="/pfp.jpg"
        alt="Hey"
      />

      <AnimatePresence>
        {openProfileCard && <ProfileHoverCard />}
      </AnimatePresence>
    </div>
  );
}
