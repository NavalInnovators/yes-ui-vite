import { useContext } from "react";
import TopicNameLabel from "../../../components/TopicNameLabel";
import QuestionContext from "../context/QuestionContext";

export default function Question() {
  const question = useContext(QuestionContext);

  if (!question) {
    return <div>No Question Found!</div>;
  }

  return (
    <div className="flex flex-col text-[18px] bg-[#fff] rounded-[10px] p-[30px] gap-[20px]">
      <h1>Question {question.id}:</h1>
      <h1>{question.content}</h1>
      <TopicNameLabel topicName={question.topic_name} />
    </div>
  );
}
