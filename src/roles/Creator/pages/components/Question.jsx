import { useContext } from "react";
import TopicNameLabel from "../../components/TopicNameLabel";
import QuestionContext from "../context/QuestionContext";

export default function Question() {
  const { question } = useContext(QuestionContext);

  return (
    <div className="dark:bg-dark-card flex-1 dark:text-white dark:border dark:border-dark-border flex flex-col text-sm bg-[#fff] rounded-[6px] px-[25px] py-[22px] gap-[20px]">
      {question ? (
        <>
          <h1>Question {question.id}:</h1>
          <h1>{question.content}</h1>
          <TopicNameLabel topicName={question.topic_name} />
        </>
      ) : (
        <h1 className="text-sm flex items-center font-medium gap-[20px]">
          Loading...
        </h1>
      )}
    </div>
  );
}
