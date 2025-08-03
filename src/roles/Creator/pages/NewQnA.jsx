import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";

import Line from "../../components/Line";
import SearchBar from "../../components/SearchBar";
import SelectTopic from "../../components/SelectTopic";
import DraftOnly from "../../Reviewer/components/sidebar-pages/new_qna_componennts/view_qna_components/DraftOnly";
import Pagination from "../../components/pagination/Pagination";

// Context
import QuestionsContext from "../../Creator/context/QuestionsContext";
import Questions from "../components/Questions";

export default function NewQnA() {
  const { questions, isLoading } = useContext(QuestionsContext);
  const [selectedOption, setSelectedOption] = useState("Select a Topic");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [currentPage, setCurrentPage] = useState(1);
  const [draftOnly, setDraftOnly] = useState(false);

  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  const PAGE_SIZE = 7;
  const options = [
    "All",
    "Algorithms",
    "Data Structures",
    "Operating Systems",
    "Networking",
    "Databases",
    "Machine Learning",
    "Artificial Intelligence",
    "Web Development",
    "Mobile Development",
    "Cybersecurity",
    "DevOps",
    "Cloud Computing",
    "Software Engineering",
    "System Design",
  ];

  const totalQuestions = filteredQuestions.length;
  const start = (currentPage - 1) * PAGE_SIZE;
  let end = Math.min(start + PAGE_SIZE, filteredQuestions.length);

  function filterBySearch() {}

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
    <motion.div
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className="h-[calc(100vh-77.5px-74px-40px)] w-full max-w-[1400px] dark:bg-dark-card dark:text-gray-300 dark:border-dark-border flex flex-col gap-[20px] border border-gray-300 p-[30px] rounded-[10px]"
    >
      <h1 className="text-[20px]">New Questions</h1>

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

      <div className="mb-[10px]"></div>

      <Pagination
        totalQuestions={totalQuestions}
        PAGE_SIZE={PAGE_SIZE}
        start={start}
        end={end}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </motion.div>
  );
}
