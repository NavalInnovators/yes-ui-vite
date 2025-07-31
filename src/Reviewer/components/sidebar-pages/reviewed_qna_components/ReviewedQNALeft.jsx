import { useState } from "react";

import Line from "../../Line";
import { options as topic_options, status } from "../../../constants/constants";
import SearchBar from "../new_qna_componennts/view_qna_components/SearchBar";
import SelectTopic from "../new_qna_componennts/view_qna_components/SelectTopic";
import ReviewedQNAQuestions from "../reviewed_qna_components/ReviewedQNAQuestions";
import Pagination from "../../pagination/Pagination";
import data from "../../../dummy_data/data";
import { PAGE_SIZE } from "../../../constants/constants";

export default function ReviewedQNALeft() {
  const [selectedTopic, setSelectedTopic] = useState("Select a Topic");
  const [selectedStatus, setSelectedStatus] = useState("Select a Status");
  const reviewed_questions = data.filter((q) => q.reviewed);
  const [questions, setQuestions] = useState(reviewed_questions);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [currentPage, setCurrentPage] = useState(1);

  const totalQuestions = filteredQuestions.length;

  const start = (currentPage - 1) * PAGE_SIZE;
  let end = Math.min(start + PAGE_SIZE, filteredQuestions.length);

  function filterByTopicName(topic_name) {
    const filteredByTopicName = questions.filter(
      (q) => q.topic_name === topic_name || topic_name === "All"
    );

    setFilteredQuestions(filteredByTopicName);
    setSelectedTopic(topic_name);
    setCurrentPage(1);
  }

  function filterByStatus(status) {
    const filteredByStatus = questions.filter((q) => q.approved === status);

    setFilteredQuestions(filteredByStatus);
    setSelectedStatus(status);
    setCurrentPage(1);
  }

  return (
    <div className="border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card w-full dark:text-dark-text-muted h-full flex flex-col gap-[20px] p-[30px] rounded-[10px]">
      <h1 className="text-[20px] dark:text-white">Reviewed Q&A</h1>

      <Line />

      <div className="flex items-center gap-[7px] w-full">
        <SearchBar />

        <SelectTopic
          options={topic_options}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedTopic}
          setSelectedOption={setSelectedTopic}
        />

        <SelectTopic
          options={status}
          filterByTopicName={filterByStatus}
          selectedOption={selectedStatus}
          setSelectedOption={setSelectedStatus}
        />
      </div>

      <Line />

      <ReviewedQNAQuestions
        filteredQuestions={filteredQuestions}
        start={start}
        end={end}
      />

      <Pagination
        totalQuestions={totalQuestions}
        PAGE_SIZE={PAGE_SIZE}
        start={start}
        end={end}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
