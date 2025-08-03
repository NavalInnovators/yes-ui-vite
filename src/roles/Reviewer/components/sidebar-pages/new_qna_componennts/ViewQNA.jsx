import { useContext, useEffect, useState } from "react";

import Line from "../../../../components/Line";
import SearchBar from "../../../../components/SearchBar";
import SelectTopic from "../../../../components/SelectTopic";
import DraftOnly from "./view_qna_components/DraftOnly";
import Questions from "./view_qna_components/Questions";
import Pagination from "../../../../components/pagination/Pagination";
import { options } from "../../../constants/constants";
import { PAGE_SIZE } from "../../../constants/constants";
import { fuzzySearch } from "../../../lib/fuzzySearch";
import QuestionsContext from "../../../context/QuestionsContext";

export default function ViewQNA() {
  const { questions, setQuestions, isLoading } = useContext(QuestionsContext);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [draftOnly, setDraftOnly] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a Topic");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [searchQuery]);

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
    <div className="h-[calc(100vh-77.5px-74px-40px)] w-full dark:bg-dark-card dark:text-gray-300 dark:border-dark-border flex flex-col gap-[20px] border border-gray-300 p-[30px] rounded-[10px]">
      <h1 className="text-[20px]">View Q&A</h1>

      <Line />

      <div className="flex items-center gap-[7px] w-full">
        <SearchBar filterBySearch={filterBySearch} searchQuery={searchQuery} />

        <SelectTopic
          options={options}
          filterByTopicName={filterByTopicName}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <DraftOnly draftOnlyFilter={draftOnlyFilter} draftOnly={draftOnly} />
      </div>

      <Line />

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
