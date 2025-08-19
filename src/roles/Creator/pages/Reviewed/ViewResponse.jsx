import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

import TopGradientBar from "./view-response-components/TopGradientBar";
import TopNavigationPanel from "./view-response-components/TopNavigationPanel";
import Section from "./view-response-components/Section";

// Context
import QuestionContext from "../context/QuestionContext";
import CommentTextContext from "../context/CommentTextContext";
import QuestionsContext from "../../context/QuestionsContext";

export default function ViewResponse() {
  const { id } = useParams();
  const { questions, isLoading } = useContext(QuestionsContext);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (questions) {
      setQuestion(questions.find((q) => q.id.toString() === id));
    }
  }, [questions, id]);

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
      <TopGradientBar question={question} />
      <TopNavigationPanel 
        renderActions={false} 
        setConfirmSubmit={setConfirmSubmit}
        statusText={"Reviewed on 01/07/2025"}
      />

      <CommentTextContext.Provider value={commentTextMemo}>
        <QuestionContext.Provider value={{ question, setQuestion }}>
          <Section showEditor={false} question={question} />
        </QuestionContext.Provider>
      </CommentTextContext.Provider>

      {/* Modal */}
      {confirmSubmit && (
        // Overlay
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(0,0,0,0.2)] backdrop-blur-[4px] flex items-center justify-center">
          {/* Modal */}
          <div className="bg-[#fff] dark:bg-dark-card dark:text-white py-[15px] px-[20px] flex flex-col justify-center shadow-[0px_0px_7px_hsl(0,0%,70%)] dark:shadow-[0px_0px_7px_hsl(0,0%,30%)] rounded-[7px] gap-[20px]">
            <h1 className="text-base">Confirm to submit this answer?</h1>
            <div className="flex justify-between items-center">
              <button
                className="cursor-pointer text-sm bg-light-card dark:bg-dark-highlight dark:text-white py-[5px] px-[10px] rounded-[5px] hover:bg-light-hover dark:hover:bg-dark-hover"
                onClick={handleCancelSubmit}
              >
                Cancel
              </button>
              <Link
                to="/creator/reviewed"
                className="py-[5px] px-[10px] text-sm bg-[hsl(144,67%,41%)] hover:bg-[hsl(144,67%,37%)] text-[#fff] rounded-[5px]"
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
