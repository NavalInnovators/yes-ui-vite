import { useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import QuestionsContext from "../../../context/QuestionsContext";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";

function ParaWithNumber({ text, number }) {
  return (
    <div className="flex flex-col">
      <p className="text-[12px] dark:text-dark-text-muted text-gray-500 font-light">
        {text}
      </p>
      <p className="text-[18px]">{number}</p>
    </div>
  );
}

export default function ReviewerAnalytics({ showReviewed }) {
  const { questions, setQuestions } = useContext(QuestionsContext);

  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="dark:bg-dark-card h-fit flex flex-col dark:text-white border-[1px] border-light-border dark:border-dark-border gap-[15px]  rounded-[8px] px-[20px] py-[10px]">
      <div className={`flex items-center justify-between`}>
        <h1 className={`font-semibold`}>Reviewer Analytics</h1>
        <div
          className="flex items-center gap-[5px] text-[14px] text-[#fff] dark:text-black dark:bg-[#fff] bg-black py-[5px] px-[15px] rounded-[7px] cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <ArrowUpFromLine size={15} />
          ) : (
            <ArrowDownFromLine size={15} />
          )}
          <p>{isOpen ? "Collapse" : "Expand"}</p>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center gap-[10px] overflow-y-hidden"
        >
          <ParaWithNumber text="Total Questions" number={totalQuestions} />
          <ParaWithNumber text="Total Accepted" number={totalAccepted} />
          <ParaWithNumber text="Total Rejected" number={totalRejected} />
          <ParaWithNumber text="Total in Pending" number={totalInPending} />
        </motion.div>
      )}
    </div>
  );
}
