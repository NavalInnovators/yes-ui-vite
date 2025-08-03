import Line from "../../components/Line";
import SelectTopic from "../../components/SelectTopic";
import { useContext, useState } from "react";
import Questions from "./Questions";
import QuestionsContext from "../context/QuestionsContext";
import { Link } from "react-router-dom";

export default function NewQuestions() {
  const { questions, isLoading } = useContext(QuestionsContext);

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
    <div className="w-[60%] flex flex-col gap-[20px] rounded-[8px] p-[30px] border-[1px] border-light-border">
      <h1 className="text-[20px]">New Questions</h1>

      <Line />

      <SelectTopic
        options={options}
        filterByTopicName={filterByTopicName}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <Line />

      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-gray-500">Loading questions...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-gray-500">No questions available</p>
        </div>
      ) : (
        <Questions filteredQuestions={questions.slice(0, 3)} />
      )}

      <Link
        to="/creator/new_qna"
        className="bg-black text-center text-[#fff] mx-auto w-fit mt-[20px] font-medium text-[17px] py-[7px] px-[20px] rounded-[5px] hover:shadow-[0px_5px_10px_hsl(0,0%,70%)] transition-all duration-200 translate-y-[3px] hover:translate-y-0"
      >
        View All
      </Link>
    </div>
  );
}
