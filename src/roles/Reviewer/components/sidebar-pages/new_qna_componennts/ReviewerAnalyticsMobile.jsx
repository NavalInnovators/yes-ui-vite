import { useContext, useState } from "react";
import { motion } from "motion/react";

import QuestionsContext from "../../../context/QuestionsContext";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import useSmallScreen from "../../../../components/custom_hooks/useSmallScreen";

function ParaWithNumber({ text, number, isSmallScreen }) {
  const textSize = isSmallScreen ? "text-[10px]" : "text-[12px]";
  const numberSize = isSmallScreen ? "text-[14px]" : "text-[18px]";

  return (
    <div className="flex flex-col items-center">
      <p
        className={`${textSize} dark:text-dark-text-muted text-gray-500 font-light`}
      >
        {text}
      </p>
      <p className={`${numberSize}`}>{number}</p>
    </div>
  );
}

export default function ReviewerAnalyticsMobile({ showReviewed = false }) {
  const { questions, setQuestions } = useContext(QuestionsContext);

  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useSmallScreen(600);

  let totalQuestions;
  let reviewedQuestions = [];

  if (showReviewed) {
    reviewedQuestions = questions.filter((q) => q.reviewed);
    totalQuestions = reviewedQuestions.length;
  } else {
    reviewedQuestions = questions;
    totalQuestions = reviewedQuestions.length;
  }

  const totalAccepted = reviewedQuestions.filter(
    (q) => q.approved === "Accepted"
  ).length;
  const totalRejected = reviewedQuestions.filter(
    (q) => q.approved === "Not Approved"
  ).length;
  const totalInPending = reviewedQuestions.filter(
    (q) => q.approved === "In Progress"
  ).length;

  const padding = isSmallScreen ? "px-[12px] py-[10px]" : "px-[20px] py-[10px]";
  const buttonPadding = isSmallScreen
    ? "py-[4px] px-[7px]"
    : "py-[5px] px-[10px]";

  return (
    <div
      className={`${padding} dark:bg-dark-card h-fit flex flex-col dark:text-white border-[1px] border-light-border dark:border-dark-border gap-[15px] rounded-[8px]`}
    >
      <div className={`flex items-center justify-between`}>
        <h1 className={`font-semibold`}>Reviewer Analytics</h1>
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
            isSmallScreen ? "flex-col p-[10px] gap-[20px]" : "items-center"
          } justify-between gap-[20%] overflow-y-hidden`}
        >
          <div className="flex flex-1 items-center justify-between">
            <ParaWithNumber
              text="Total Questions"
              number={totalQuestions}
              isSmallScreen={isSmallScreen}
            />
            <ParaWithNumber
              text="Total Accepted"
              number={totalAccepted}
              isSmallScreen={isSmallScreen}
            />
          </div>

          <div className="flex flex-1 items-center justify-between">
            <ParaWithNumber
              text="Total Rejected"
              number={totalRejected}
              isSmallScreen={isSmallScreen}
            />
            <ParaWithNumber
              text="Total in Pending"
              number={totalInPending}
              isSmallScreen={isSmallScreen}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
