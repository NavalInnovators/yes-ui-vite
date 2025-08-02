import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

import TopGradientBar from "./components/TopGradientBar";
import TopNavigationPanel from "./components/TopNavigationPanel";
import Section from "./components/Section";

// Context
import QuestionContext from "./context/QuestionContext";
import CommentTextContext from "./context/CommentTextContext";
import QuestionsContext from "../../context/QuestionsContext";

export default function DraftPage() {
  const { id } = useParams();
  const { questions, isLoading } = useContext(QuestionsContext);

  const [question, setQuestion] = useState({
    id: 2,
    content:
      "What are some best practices for responsive design in modern web development workflows? What are some industry standards regarding this? Discuss any relevant libraries or tools.",
    topic_name: "React",
    answers_submitted_by_user: 2,
    status: "Draft",
    approved: "Accepted",
    reviewed: true,
    stars: 2.5,
  });

  const [commentText, setCommentText] = useState("");
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const commentTextMemo = useMemo(
    () => ({ commentText, setCommentText }),
    [commentText]
  );

  function handleCancelSubmit() {
    setConfirmSubmit(false);
  }

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
        <QuestionContext.Provider value={question}>
          <TopNavigationPanel setConfirmSubmit={setConfirmSubmit} />
          <Section />
        </QuestionContext.Provider>
      </CommentTextContext.Provider>

      {/* Modal */}
      {confirmSubmit && (
        // Overlay
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(255,255,255,0.2)] backdrop-blur-[4px] flex items-center justify-center">
          {/* Modal */}
          <div className="bg-[#fff] p-[20px] px-[25px] flex flex-col justify-center shadow-[0px_0px_7px_hsl(0,0%,70%)] rounded-[7px] gap-[20px]">
            <h1 className="text-[20px]">Confirm to submit this answer?</h1>
            <div className="flex justify-between items-center">
              <button
                className="cursor-pointer bg-light-card py-[9px] px-[20px] rounded-[7px] hover:bg-light-hover"
                onClick={handleCancelSubmit}
              >
                Cancel
              </button>
              <Link
                to="/reviewer/reviewed_qna"
                className="py-[9px] px-[20px] bg-[hsl(144,67%,41%)] hover:bg-[hsl(144,67%,37%)] text-[#fff] rounded-[7px]"
              >
                Submit Answer
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
