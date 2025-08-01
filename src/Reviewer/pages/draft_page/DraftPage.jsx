import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";

import TopGradientBar from "./components/TopGradientBar";
import TopNavigationPanel from "./components/TopNavigationPanel";
import Section from "./components/Section";
import questions from "../../dummy_data/data";

// Context
import QuestionContext from "./context/QuestionContext";
import CommentTextContext from "./context/CommentTextContext";

export default function DraftPage() {
  const { id } = useParams();
  const question = questions.filter((q) => q.id === Number(id));
  const [commentText, setCommentText] = useState("");

  const commentTextMemo = useMemo(
    () => ({ commentText, setCommentText }),
    [commentText]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ ease: "circOut", duration: 0.2 }}
    >
      <TopGradientBar />

      <CommentTextContext.Provider value={commentTextMemo}>
        <QuestionContext.Provider value={question[0]}>
          <TopNavigationPanel />
          <Section />
        </QuestionContext.Provider>
      </CommentTextContext.Provider>
    </motion.div>
  );
}
