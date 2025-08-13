import { useContext } from "react";
import QuestionContext from "../context/QuestionContext";

export default function UserAnswer() {
  const { question } = useContext(QuestionContext);

  return (
    <div className="dark:bg-dark-card dark:text-white dark:border dark:border-dark-border flex flex-col text-sm bg-[#fff] rounded-[6px] px-[25px] py-[22px] gap-[20px]">
      <h1 className="text-sm font-semibold">Your Answer:</h1>
      <div className="dark:bg-dark-highlight p-[25px] rounded-[6px] text-sm leading-6 text-gray-700 dark:text-gray-300">
        {question ? (
          <p>
            This is where the user's answer will be displayed. The answer should be well-structured, 
            comprehensive, and provide clear explanations to the question. It should include relevant 
            examples, code snippets if applicable, and follow best practices for the given topic.
          </p>
        ) : (
          <p>Loading answer...</p>
        )}
      </div>
    </div>
  );
}
