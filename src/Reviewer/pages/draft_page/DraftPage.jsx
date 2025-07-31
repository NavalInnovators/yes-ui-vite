import { useParams } from "react-router-dom";

import TopGradientBar from "./components/TopGradientBar";
import TopNavigationPanel from "./components/TopNavigationPanel";
import Section from "./components/Section";
import questions from "../../dummy_data/data";

// Context
import QuestionContext from "./context/QuestionContext";
import CommentTextContext from "./context/CommentTextContext";
import { useMemo, useState } from "react";

export default function DraftPage() {
  const { id } = useParams();
  const question = questions.filter((q) => q.id === Number(id));
  const [commentText, setCommentText] = useState("");

  const commentTextMemo = useMemo(
    () => ({ commentText, setCommentText }),
    [commentText]
  );

  return (
    <div>
      <TopGradientBar />

      <CommentTextContext.Provider value={commentTextMemo}>
        <QuestionContext.Provider value={question[0]}>
          <TopNavigationPanel />
          <Section />
        </QuestionContext.Provider>
      </CommentTextContext.Provider>
    </div>
  );
}
