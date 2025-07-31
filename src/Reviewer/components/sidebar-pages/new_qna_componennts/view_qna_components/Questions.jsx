import Question from "./Question";

export default function Questions({ filteredQuestions, start, end }) {
  if (filteredQuestions.length === 0) {
    return <div>No Questions Found!</div>;
  }

  return (
    <div className="flex flex-col gap-[20px]">
      {filteredQuestions.slice(start, end).map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
}
