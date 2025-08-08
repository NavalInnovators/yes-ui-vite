import ReviewedQuestion from "../reviewed_qna_components/ReviewedQuestion";
import { motion } from "motion/react";
import { Outlet } from "react-router-dom";

export default function Questions({ filteredQuestions, start, end }) {
  if (filteredQuestions.length === 0) {
    return <div>No Questions Found!</div>;
  }

  return (
    <motion.div
      key={start + end + filteredQuestions.length}
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className="flex flex-col gap-[12px]"
    >
      {filteredQuestions.slice(start, end).map((question) => (
        <ReviewedQuestion key={question.id} question={question} />
      ))}
      <Outlet />
    </motion.div>
  );
}
