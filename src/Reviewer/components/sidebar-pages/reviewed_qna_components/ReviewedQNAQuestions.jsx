import ReviewedQuestion from "../reviewed_qna_components/ReviewedQuestion";

export default function Questions({ filteredQuestions, start, end }) {
  return (
    <div className="flex flex-col gap-[20px]">
      {filteredQuestions.slice(start, end).map((question) => (
        <ReviewedQuestion key={question.id} question={question} />
      ))}
    </div>
  );
}
