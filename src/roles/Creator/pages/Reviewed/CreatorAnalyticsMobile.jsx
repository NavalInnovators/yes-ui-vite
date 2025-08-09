import { useContext, useState } from "react";
import { motion } from "motion/react";

import QuestionsContext from "../../context/QuestionsContext";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import WindowWidthContext from "../../context/WindowWidthContext";

function ParaWithNumber({ text, number }) {
  // Always use the larger text size

  return (
    <div className="flex flex-col items-center">
      <p
        className={`text-[12px] dark:text-dark-text-muted text-gray-500 font-light`}
      >
        {text}
      </p>
      <p className={`text-[18px]`}>{number}</p>
    </div>
  );
}

export default function CreatorAnalyticsMobile() {
  const { questions } = useContext(QuestionsContext);
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 600;

  const [isOpen, setIsOpen] = useState(false);

  // Calculate analytics from reviewed questions data
  const reviewedQuestions = questions.filter(q => q.reviewed === true);
  const totalReviewed = reviewedQuestions.length;
  const totalAccepted = reviewedQuestions.filter(q => q.approved === "Accepted").length;
  const totalRejected = reviewedQuestions.filter(q => q.approved === "Not Approved").length;
  const totalInProgress = reviewedQuestions.filter(q => q.approved === "In Progress").length;

  const padding = isSmallScreen ? "px-[17px] py-[12px]" : "px-[20px] py-[15px]";
  const buttonPadding = isSmallScreen
    ? "py-[4px] px-[7px]"
    : "py-[5px] px-[10px]";

  return (
    <div
      className={`${padding} dark:bg-dark-card h-fit flex flex-col dark:text-white border-[1px] border-light-border dark:border-dark-border gap-[15px] rounded-[8px]`}
    >
      <div className={`flex items-center justify-between`}>
        <h1 className={`font-semibold`}>Creator Analytics</h1>
        <div
          className={`${buttonPadding} flex items-center gap-[5px] text-[12px] text-[#fff] dark:text-black dark:bg-[#fff] bg-black hover:bg-dark-more-highlighted dark:hover:bg-[hsl(0,0%,90%)] rounded-[7px] cursor-pointer transition hover:scale-[0.97]`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <ArrowUpFromLine size={13} />
          ) : (
            <ArrowDownFromLine size={13} />
          )}
          <p>{isOpen ? "Collapse" : "Expand"}</p>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex ${
            isSmallScreen ? "flex-col px-[30px] gap-[20px]" : "items-center"
          } justify-between gap-[20%] overflow-y-hidden`}
        >
          <div className="flex flex-1 items-center justify-between">
            <ParaWithNumber
              text="Total Reviewed"
              number={totalReviewed}
            />
            <ParaWithNumber
              text="Total Accepted"
              number={totalAccepted}
            />
          </div>

          <div className="flex flex-1 items-center justify-between">
            <ParaWithNumber
              text="Total Rejected"
              number={totalRejected}
            />
            <ParaWithNumber
              text="Total In Progress"
              number={totalInProgress}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
