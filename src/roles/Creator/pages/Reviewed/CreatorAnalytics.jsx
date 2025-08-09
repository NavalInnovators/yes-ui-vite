import { useContext } from "react";
import QuestionsContext from "../../context/QuestionsContext";
import useLine from "../../../components/custom_hooks/useLine";

export default function CreatorAnalytics() {
  const { questions } = useContext(QuestionsContext);
  const line = useLine();

  // Calculate analytics from reviewed questions data
  const reviewedQuestions = questions.filter(q => q.reviewed === true);
  const totalReviewed = reviewedQuestions.length;
  const totalAccepted = reviewedQuestions.filter(q => q.approved === "Accepted").length;
  const totalRejected = reviewedQuestions.filter(q => q.approved === "Not Approved").length;
  const totalInProgress = reviewedQuestions.filter(q => q.approved === "In Progress").length;

  return (
    <div className="dark:bg-dark-card h-fit flex flex-col dark:text-white border-[1px] border-light-border dark:border-dark-border gap-[15px] w-[250px] p-[20px] rounded-[8px]">
      <h1 className={`font-semibold ${line}`}>Creator Analytics</h1>

      <h2 className="text-[14px]">Reviewed Questions</h2>

      <div>
        <p className="text-[12px] dark:text-dark-text-muted text-gray-500 font-light">
          Total Reviewed
        </p>
        <p className="text-[18px]">{totalReviewed}</p>
      </div>

      <div>
        <p className="text-[12px] dark:text-dark-text-muted text-gray-500 font-light">
          Total Accepted
        </p>
        <p className="text-[18px]">{totalAccepted}</p>
      </div>

      <div className={`${line}`}>
        <p className="text-[12px] dark:text-dark-text-muted text-gray-500 font-light">
          Total Rejected
        </p>
        <p className="text-[18px]">{totalRejected}</p>
      </div>

      <h2 className="text-[14px]">In Progress</h2>

      <div>
        <p className="text-[12px] dark:text-dark-text-muted text-gray-500 font-light">
          Total In Progress
        </p>
        <p className="text-[18px]">{totalInProgress}</p>
      </div>
    </div>
  );
}
