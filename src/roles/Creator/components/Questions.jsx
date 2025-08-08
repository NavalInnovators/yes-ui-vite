import Question from "./Question";
import { motion } from "motion/react";

export default function Questions({ filteredQuestions, start, end, showOnlyTopic = false }) {
  if (filteredQuestions.length === 0) {
    return <div>No Question Found!</div>;
  }

  return (
    <motion.div
      key={start + end + filteredQuestions.length}
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className="flex flex-col gap-[12px]"
    >
      {filteredQuestions.slice(start, end).map((question) => (
        <Question key={question.id} question={question} showOnlyTopic={showOnlyTopic} />
      ))}
    </motion.div>
  );
}
