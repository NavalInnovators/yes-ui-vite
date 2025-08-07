import { useContext, useEffect, useState } from "react";

import SearchBar from "../../../../components/SearchBar";
import SelectTopic from "../../../../components/SelectTopic";
import DraftOnly from "./view_qna_components/DraftOnly";
import Questions from "./view_qna_components/Questions";
import Pagination from "../../../../components/pagination/Pagination";
import { options } from "../../../constants/constants";
import { PAGE_SIZE } from "../../../constants/constants";
import { fuzzySearch } from "../../../lib/fuzzySearch";
import QuestionsContext from "../../../context/QuestionsContext";
import WindowWidthContext from "../../../context/WindowWidthContext";
import useLine from "../../../../components/custom_hooks/useLine";

export default function ViewQNA() {
  const { questions, setQuestions, isLoading } = useContext(QuestionsContext);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [draftOnly, setDraftOnly] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a Topic");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 800;
  const is600px = windowWidth < 600;
  const line = useLine();

  // Responsive padding like ReviewerAnalyticsMobile
  const padding = is600px ? "px-[17px] py-[17px]" : "px-[20px] py-[20px]";

  useEffect(() => {
    setFilteredQuestions(questions);
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

    setDraftOnly(false);
    setSelectedOption("All");
    setCurrentPage(1);

    setFilteredQuestions(
      questions.filter((q) => fuzzySearch(searchQuery, q.content))
    );
  }, [searchQuery, questions]);

  function filterBySearch(e) {
    setSearchQuery(e.target.value);

    // Reset Other Filters
    setSelectedOption("Select a Topic");
    setDraftOnly(false);
  }

  function filterByTopicName(topic_name) {
    const filteredByTopicName = questions.filter(
      (q) => q.topic_name === topic_name || topic_name === "All"
    );

    setFilteredQuestions(filteredByTopicName);
    setSelectedOption(topic_name);

    // Reset Other Filter
    setSearchQuery("");
    setDraftOnly(false);
    setCurrentPage(1);
  }

  function draftOnlyFilter() {
    if (draftOnly === false) {
      // Turn on the filter
      setFilteredQuestions(questions.filter((q) => q.status === "Draft"));
    } else {
      // Turn off the filter
      if (selectedOption === "All" || selectedOption === "Select a Topic") {
        setFilteredQuestions(questions);
      } else {
        setFilteredQuestions(
          questions.filter((q) => q.topic_name === selectedOption)
        );
      }
    }

    setDraftOnly((prev) => !prev);

    // Reset Other Filters
    setSearchQuery("");
    setSelectedOption("Select a Topic");
    setCurrentPage(1);
  }

  return (
    <div className={`w-full dark:bg-dark-card dark:text-gray-300 dark:border-dark-border flex flex-col gap-[15px] border border-gray-300 ${padding} rounded-[10px]`}>
      <h1 className={`text-[18px] ${line} font-semibold`}>View Q&A</h1>

      {isSmallScreen ? (
        // Small screen layout: Search bar full width, others below
        <div className={`flex flex-col gap-[10px] w-full ${line}`}>
          <SearchBar filterBySearch={filterBySearch} searchQuery={searchQuery} />
          <div className="flex items-center gap-[7px] w-full">
            <SelectTopic
              options={options}
              filterByTopicName={filterByTopicName}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <DraftOnly draftOnlyFilter={draftOnlyFilter} draftOnly={draftOnly} />
          </div>
        </div>
      ) : (
        // Large screen layout: All elements in one row
        <div className={`flex items-center gap-[7px] w-full ${line}`}>
          <SearchBar filterBySearch={filterBySearch} searchQuery={searchQuery} />
          <SelectTopic
            options={options}
            filterByTopicName={filterByTopicName}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <DraftOnly draftOnlyFilter={draftOnlyFilter} draftOnly={draftOnly} />
        </div>
      )}

      {isLoading ? (
        <div className="text-2xl text-center mt-[100px]">
          Loading Questions...
        </div>
      ) : (
        <Questions
          filteredQuestions={filteredQuestions}
          PAGE_SIZE={PAGE_SIZE}
          start={start}
          end={end}
        />
      )}

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
