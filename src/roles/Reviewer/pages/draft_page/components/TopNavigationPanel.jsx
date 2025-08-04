import { useState } from "react";

import SelectTopic from "../../../../components/SelectTopic";
import Pagination from "../../../../components/pagination/Pagination";

export default function TopNavigationPanel({ setConfirmSubmit }) {
  const [selectedTopic, setSelectedTopic] = useState("Select a Topic");
  const [selectedResponse, setSelectedResponse] = useState("View all Answers");
  const [currentPage, setCurrentPage] = useState(1);

  const totalQuestions = 10;

  const topics = [
    "Data Structures",
    "Machine Learning",
    "Data Science",
    "Theory of Automata",
    "Operating System",
  ];

  const responses = [
    "Response ID 234845",
    "Response ID 384777",
    "Response ID 214578",
  ];

  function handleConfirmSubmit() {
    setConfirmSubmit(true);
  }

  // Cannot proceed with this function without backend
  function filterByTopicName() {}

  return (
    <div className="py-[8px] px-[25px] flex justify-between items-center">
      <div className="flex items-center gap-[10px]">
        <SelectTopic
          options={topics}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedTopic}
          setSelectedOption={setSelectedTopic}
        />

        <SelectTopic
          options={responses}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedResponse}
          setSelectedOption={setSelectedResponse}
        />
      </div>

      <Pagination
        totalQuestions={totalQuestions}
        PAGE_SIZE={4}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex items-center gap-[3px] text-sm font-medium">
        <button className="transition-colors cursor-pointer border-[2px] border-red-200 hover:bg-red-200 py-[5px] px-[15px] text-red-600 rounded-l-[7px]">
          Reject
        </button>

        <button className="transition-colors cursor-pointer border-[2px] border-green-200 hover:bg-green-200 py-[5px] px-[15px] text-green-600 rounded-r-[7px]">
          Approve
        </button>

        <button
          onClick={handleConfirmSubmit}
          className="transition-colors hover:text-white hover:bg-transparent ml-[15px] rounded-[5px] cursor-pointer bg-[#fff] py-[5px] px-[20px] relative gradient-button"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
}
