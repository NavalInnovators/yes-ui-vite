import CreatorAnalytics from "../components/CreatorAnalytics";
import MyProfile from "../components/MyProfile";
import NewQuestions from "../components/NewQuestions";
import TopCreators from "../components/TopCreators";
import TotalEarning from "../components/TotalEarning";
import { motion } from "motion/react";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className="max-w-[1200px] w-[100%] flex flex-col gap-[20px]"
    >
      <div className="flex gap-[20px]">
        <CreatorAnalytics />
        <TotalEarning />
      </div>

      <div className="flex gap-[20px]">
        <NewQuestions />

        <div className="w-[40%] flex flex-col gap-[20px]">
          <MyProfile />
          <TopCreators />
        </div>
      </div>
    </motion.div>
  );
}
