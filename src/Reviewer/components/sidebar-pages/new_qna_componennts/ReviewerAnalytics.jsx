import { useContext } from "react";

import QuestionsContext from "../../../context/QuestionsContext";
import Line from "../../Line";

export default function ReviewerAnalytics({ showReviewed }) {
  const { questions, setQuestions } = useContext(QuestionsContext);

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
    <div className="dark:bg-dark-card flex flex-col dark:text-white border-[1px] border-light-border dark:border-dark-border gap-[20px] w-[280px] p-[30px] rounded-[8px]">
      <h1 className="text-[20px]">Reviewer Analytics</h1>
      <Line />

      <h2 className="text-[16px]">Total Reviewed</h2>

      <div>
        <p className="text-[14px] dark:text-dark-text-muted text-gray-500 font-light">
          Total Questions
        </p>
        <p className="text-[20px]">{totalQuestions}</p>
      </div>

      <div>
        <p className="text-[14px] dark:text-dark-text-muted text-gray-500 font-light">
          Total Accepted
        </p>
        <p className="text-[20px]">{totalAccepted}</p>
      </div>

      <div>
        <p className="text-[14px] dark:text-dark-text-muted text-gray-500 font-light">
          Total Rejected
        </p>
        <p className="text-[20px]">{totalRejected}</p>
      </div>

      <Line />

      <h2>All in Review</h2>

      <div>
        <p className="text-[14px] dark:text-dark-text-muted text-gray-500 font-light">
          Total in Pending
        </p>
        <p className="text-[20px]">{totalInPending}</p>
      </div>
    </div>
  );
}
