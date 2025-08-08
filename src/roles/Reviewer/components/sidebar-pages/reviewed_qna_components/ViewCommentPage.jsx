import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

import ViewTopGradientBar from "./ViewTopGradientBar";
import TopNavigationPanel from "../../../pages/draft_page/components/TopNavigationPanel";
import Section from "../../../pages/draft_page/components/Section";

// Context
import QuestionContext from "../../../pages/draft_page/context/QuestionContext";
import CommentTextContext from "../../../pages/draft_page/context/CommentTextContext";
import QuestionsContext from "../../../context/QuestionsContext";

export default function ViewCommentPage() {
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

  // Decide action rendering and status label based on approval state
  const approvedState = question?.approved;
  let renderActions = false;
  let statusText = "";

  if (approvedState === "In Progress") {
    renderActions = true;
  } else if (approvedState === "Accepted") {
    statusText = `Accepted at 04/11/2025`;
  } else if (approvedState === "Not Approved") {
    statusText = `Rejected at 04/11/2025`;
  }

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: "0vh" }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.9 }}
      className="absolute top-0 w-full overflow-y-auto left-0 bg-[#fff] z-[10]"
   >
      <ViewTopGradientBar />
      <TopNavigationPanel
        setConfirmSubmit={setConfirmSubmit}
        renderActions={renderActions}
        statusText={statusText}
      />

      <CommentTextContext.Provider value={commentTextMemo}>
        <QuestionContext.Provider value={{ question, setQuestion }}>
          <Section showEditor={approvedState === "In Progress"} />
        </QuestionContext.Provider>
      </CommentTextContext.Provider>

      {confirmSubmit && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(255,255,255,0.2)] backdrop-blur-[4px] flex items-center justify-center">
          <div className="bg-[#fff] py-[15px] px-[20px] flex flex-col justify-center shadow-[0px_0px_7px_hsl(0,0%,70%)] rounded-[7px] gap-[20px]">
            <h1 className="text-base">Confirm to submit this answer?</h1>
            <div className="flex justify-between items-center">
              <button
                className="cursor-pointer text-sm bg-light-card py-[5px] px-[10px] rounded-[5px] hover:bg-light-hover"
                onClick={handleCancelSubmit}
              >
                Cancel
              </button>
              <Link
                to="/reviewer/reviewed_qna"
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
