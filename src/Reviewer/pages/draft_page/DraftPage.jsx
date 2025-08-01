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
      initial={{ translateY: "100%" }}
      animate={{ translateY: "0%" }}
      exit={{ translateY: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1,
      }}
      className="absolute top-0 left-0 bg-[#fff] z-[10]"
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
