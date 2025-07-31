import { useState } from "react";

import SelectTopic from "../../../components/sidebar-pages/new_qna_componennts/view_qna_components/SelectTopic";
import Pagination from "../../../components/pagination/Pagination";
import { Link } from "react-router-dom";

export default function TopNavigationPanel() {
  const [selectedOption, setSelectedOption] = useState("Select a Topic");
  const [currentPage, setCurrentPage] = useState(1);

  const totalQuestions = 10;

  const options = [
    "Response ID 234845",
    "Response ID 384777",
    "Response ID 214578",
  ];

  function filterByTopicName() {}

  return (
    <div className="py-[10px] px-[25px] flex justify-between items-center">
      <div className="flex items-center gap-[10px]">
        <SelectTopic
          options={options}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <SelectTopic
          options={options}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <Pagination
        totalQuestions={totalQuestions}
        PAGE_SIZE={4}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex items-center gap-[3px] text-[18px] font-medium">
        <button className="transition-colors cursor-pointer border-[2px] border-red-200 hover:bg-red-200 py-[7px] px-[20px] text-red-600 rounded-l-[7px]">
          Reject
        </button>

        <button className="transition-colors cursor-pointer border-[2px] border-green-200 hover:bg-green-200 py-[7px] px-[20px] text-green-600 rounded-r-[7px]">
          Approve
        </button>

        <Link
          to="/reviewed_qna"
          className="transition-colors hover:text-white hover:bg-transparent ml-[15px] rounded-[8px] cursor-pointer bg-[#fff] py-[7px] px-[20px] relative gradient-button"
        >
          Submit Comment
        </Link>
      </div>
    </div>
  );
}
