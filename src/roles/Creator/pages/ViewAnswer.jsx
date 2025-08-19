import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

import TopGradientBar from "./components/TopGradientBar";
import TopNavigationPanel from "./components/TopNavigationPanel";
import Section from "./components/Section";

// Context
import QuestionContext from "./context/QuestionContext";
import CommentTextContext from "./context/CommentTextContext";
import QuestionsContext from "../context/QuestionsContext";

export default function ViewAnswer() {
  const { id } = useParams();
  const { questions, isLoading } = useContext(QuestionsContext);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (questions) {
      setQuestion(questions.find((q) => q.id.toString() === id));
    }
  }, [questions, id]);

  const [commentText, setCommentText] = useState("");
  const [submittedDate] = useState("4/11/2025"); // Random date as requested

  const commentTextMemo = useMemo(
    () => ({ commentText, setCommentText }),
    [commentText]
  );

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: "0vh" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.9,
      }}
      className="absolute top-0 w-full overflow-y-auto left-0 bg-[#fff] dark:bg-black z-[10]"
    >
      <TopGradientBar />
      <TopNavigationPanel 
        renderActions={false} 
        statusText={`Submitted on ${submittedDate}`}
      />

      <CommentTextContext.Provider value={commentTextMemo}>
        <QuestionContext.Provider value={{ question, setQuestion }}>
          <Section showEditor={false} />
        </QuestionContext.Provider>
      </CommentTextContext.Provider>
    </motion.div>
  );
}
