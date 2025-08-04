import { useContext, useEffect, useState } from "react";

import { line } from "../../../../components/constants";
import { options as topic_options, status } from "../../../constants/constants";
import SearchBar from "../../../../components/SearchBar";
import SelectTopic from "../../../../components/SelectTopic";
import ReviewedQNAQuestions from "../reviewed_qna_components/ReviewedQNAQuestions";
import Pagination from "../../../../components/pagination/Pagination";
import { PAGE_SIZE } from "../../../constants/constants";
import { fuzzySearch } from "../../../lib/fuzzySearch";

import QuestionsContext from "../../../context/QuestionsContext";
import useSmallScreen from "../../../../components/custom_hooks/useSmallScreen";

export default function ReviewedQNALeft() {
  const { questions, setQuestions } = useContext(QuestionsContext);

  const [selectedTopic, setSelectedTopic] = useState("Select a Topic");
  const [selectedStatus, setSelectedStatus] = useState("Select a Status");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const is600px = useSmallScreen(600);

  useEffect(() => {
    setFilteredQuestions(questions.filter((q) => q.reviewed));
  }, [questions]);

  const totalQuestions = filteredQuestions.length;

  const start = (currentPage - 1) * PAGE_SIZE;
  let end = Math.min(start + PAGE_SIZE, filteredQuestions.length);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredQuestions(questions);
      setCurrentPage(1);
      return;
    }

    setFilteredQuestions(
      questions.filter((q) => fuzzySearch(searchQuery, q.content))
    );

    setCurrentPage(1);
  }, [searchQuery, questions]);

  function filterBySearch(e) {
    setSearchQuery(e.target.value);

    // Reset Other Filters
    setSelectedStatus("Select a Status");
    setSelectedTopic("Select a Topic");
  }

  function filterByTopicName(topic_name) {
    const filteredByTopicName = questions.filter(
      (q) => q.topic_name === topic_name || topic_name === "All"
    );

    setFilteredQuestions(filteredByTopicName);
    setSelectedTopic(topic_name);

    // Reset Other Filters
    setSelectedStatus("Select a Status");
    setSearchQuery("");
    setCurrentPage(1);
  }

  function filterByStatus(status) {
    const filteredByStatus = questions.filter((q) => q.approved === status);

    setFilteredQuestions(filteredByStatus);
    setSelectedStatus(status);

    // Reset Other Filters
    setSelectedTopic("Select a Topic");
    setSearchQuery("");
    setCurrentPage(1);
  }

  return (
    <div className="border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card w-full dark:text-dark-text-muted h-full flex flex-col gap-[15px] px-[25px] py-[20px] rounded-[10px]">
      <h1 className={`text-[18px] font-semibold dark:text-white ${line}`}>
        Reviewed Q&A
      </h1>

      <div
        className={`flex items-center gap-[7px] w-full ${line} ${
          is600px && "flex-wrap"
        }`}
      >
        <SearchBar filterBySearch={filterBySearch} searchQuery={searchQuery} />

        <div className="flex items-center gap-[7px] flex-1">
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
      </div>

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
