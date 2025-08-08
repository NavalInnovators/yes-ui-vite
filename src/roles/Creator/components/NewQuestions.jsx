import SelectTopic from "../../components/SelectTopic";
import { useContext, useState } from "react";
import Questions from "./Questions";
import QuestionsContext from "../context/QuestionsContext";
import { Link } from "react-router-dom";
import WindowWidthContext from "../../Reviewer/context/WindowWidthContext";

export default function NewQuestions() {
  const { questions, isLoading } = useContext(QuestionsContext);
  const windowWidth = useContext(WindowWidthContext);

  const is1200px = windowWidth < 1200;

  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
  ];

  const [selectedOption, setSelectedOption] = useState("Select an Option");

  function filterByTopicName() {}

  return (
    <div className="flex flex-col gap-[15px] rounded-[8px] p-[20px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white">
      <h1 className="text-[16px] border-b border-light-border dark:border-dark-border pb-[15px]">
        New Questions
      </h1>

      <div className="border-b border-light-border dark:border-dark-border pb-[15px]">
        <SelectTopic
          options={options}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <div className="pt-[5px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-[150px]">
            <p className="text-gray-500 dark:text-dark-text-muted">
              Loading questions...
            </p>
          </div>
        ) : questions.length === 0 ? (
          <div className="flex justify-center items-center h-[150px]">
            <p className="text-gray-500 dark:text-dark-text-muted">
              No questions available
            </p>
          </div>
        ) : (
          <Questions
            filteredQuestions={questions.slice(0, 3)}
            showOnlyTopic={true}
          />
        )}
      </div>

      <div className="flex justify-center mt-[20px]">
        <Link
          to="/creator/new_qna"
          className="bg-black text-center border-[1px] border-light-border dark:border-white dark:hover:bg-white text-[#fff] dark:bg-white dark:text-black font-medium text-[14px] py-[6px] px-[16px] rounded-[5px] dark:hover:shadow-[0px_0px_20px_hsl(0,0%,50%)] hover:bg-dark-highlight transition-all duration-200 hover:translate-y-[-3px]  hover:shadow-[0px_0px_20px_hsl(0,0%,50%)]"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
