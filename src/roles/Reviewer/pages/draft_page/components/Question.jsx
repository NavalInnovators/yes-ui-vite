import { useContext } from "react";
import TopicNameLabel from "../../../components/TopicNameLabel";
import QuestionContext from "../context/QuestionContext";

export default function Question() {
  const { question } = useContext(QuestionContext);

  return (
    <div className="flex flex-col text-[18px] bg-[#fff] rounded-[10px] p-[30px] gap-[20px]">
      {question ? (
        <>
          <h1>Question {question.id}:</h1>
          <h1>{question.content}</h1>
          <TopicNameLabel topicName={question.topic_name} />
        </>
      ) : (
        <h1 className="text-[20px] flex items-center font-medium gap-[20px]">
          Loading...
        </h1>
      )}
    </div>
  );
}
