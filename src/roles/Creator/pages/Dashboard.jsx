import { useContext } from "react";
import CreatorAnalytics from "../components/CreatorAnalytics";
import MyProfile from "../components/MyProfile";
import NewQuestions from "../components/NewQuestions";
import TopCreators from "../components/TopCreators";
import TotalEarning from "../components/TotalEarning";
import { motion } from "motion/react";
import WindowWidthContext from "../context/WindowWidthContext";

export default function Dashboard() {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 850;

  return (
    <motion.div
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className="max-w-[1200px] w-[100%] flex flex-col gap-[20px]"
    >
      <div className={`flex gap-[20px] ${isSmallScreen ? "flex-col" : ""}`}>
        <div className={`${isSmallScreen ? "w-full" : "w-[60%]"}`}>
          <CreatorAnalytics />
        </div>
        <div className={`${isSmallScreen ? "w-full" : "w-[40%]"}`}>
          <TotalEarning />
        </div>
      </div>

      <div className={`flex gap-[20px] ${isSmallScreen ? "flex-col" : ""}`}>
        <div className={`${isSmallScreen ? "w-full" : "w-[60%]"}`}>
          <NewQuestions />
        </div>

        <div className={`flex flex-col gap-[20px] ${isSmallScreen ? "w-full" : "w-[40%]"}`}>
          <MyProfile />
          <TopCreators />
        </div>
      </div>
    </motion.div>
  );
}
