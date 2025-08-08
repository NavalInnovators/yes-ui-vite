import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";

import SearchBar from "../../components/SearchBar";
import SelectTopic from "../../components/SelectTopic";
import Pagination from "../../components/pagination/Pagination";
import { fuzzySearch } from "../../Reviewer/lib/fuzzySearch";
import ReviewAndEditOnly from "../components/ReviewAndEditOnly";

// Context
import QuestionsContext from "../context/QuestionsContext";
import WindowWidthContext from "../context/WindowWidthContext";
import useLine from "../../components/custom_hooks/useLine";

export default function Pending() {
  const { questions, isLoading } = useContext(QuestionsContext);
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 760;
  const is600px = windowWidth < 600;
  const line = useLine();
  
  const padding = is600px ? "p-[17px]" : "p-[20px]";
  
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select a Topic");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewAndEditOnly, setReviewAndEditOnly] = useState(false);

  useEffect(() => {
    const pending = questions.filter(q => q.reviewed === false);

    setPendingQuestions(pending);
    setFilteredQuestions(pending);
  }, [questions]);

  // Search Functionality
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredQuestions(pendingQuestions);
      setCurrentPage(1);
      return;
    }

    setSelectedOption("All");
    setCurrentPage(1);

    setFilteredQuestions(
      pendingQuestions.filter((q) => fuzzySearch(searchQuery, q.content))
    );
  }, [searchQuery, pendingQuestions]);

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

  function filterBySearch(e) {
    setSearchQuery(e.target.value);

    // Reset Other Filters
    setSelectedOption("Select a Topic");
  }

  function filterByTopicName(topic_name) {
    const filteredByTopicName = pendingQuestions.filter(
      (q) => q.topic_name === topic_name || topic_name === "All"
    );

    setFilteredQuestions(filteredByTopicName);
    setSelectedOption(topic_name);

    // Reset Other Filter
    setSearchQuery("");
    setCurrentPage(1);
  }

  function reviewAndEditOnlyFilter() {
    setReviewAndEditOnly(!reviewAndEditOnly);

    // Reset other filters
    setSelectedOption("Select a Topic");
    setSearchQuery("");
    setCurrentPage(1);

    if (reviewAndEditOnly) {
      setFilteredQuestions(pendingQuestions);
    } else {
      setFilteredQuestions(pendingQuestions.filter(q => q.answered === false));
    }
  }

  return (
    <motion.div
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className={`w-full dark:bg-dark-card dark:text-gray-300 dark:border-dark-border flex flex-col gap-[15px] border border-gray-300 ${padding} rounded-[10px]`}
    >
      <h1 className={`text-[18px] font-semibold ${line}`}>In Review</h1>

      {isSmallScreen ? (
        <div className={`flex flex-col gap-[10px] w-full ${line}`}>
          <SearchBar filterBySearch={filterBySearch} searchQuery={searchQuery} />
          <div className={`flex items-center gap-[7px] w-full`}>
            <SelectTopic
              options={options}
              filterByTopicName={filterByTopicName}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <ReviewAndEditOnly 
              reviewAndEditOnlyFilter={reviewAndEditOnlyFilter} 
              reviewAndEditOnly={reviewAndEditOnly}
            />
          </div>
        </div>
      ) : (
        <div className={`flex items-center gap-[7px] w-full ${line}`}>
          <SearchBar filterBySearch={filterBySearch} searchQuery={searchQuery} />
          <SelectTopic
            options={options}
            filterByTopicName={filterByTopicName}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <ReviewAndEditOnly reviewAndEditOnlyFilter={reviewAndEditOnlyFilter} reviewAndEditOnly={reviewAndEditOnly} />
        </div>
      )}

      {isLoading ? (
        <div className="text-2xl text-center mt-[100px]">
          Loading Questions...
        </div>
      ) : (
        !filteredQuestions.length ? (
          <div className="text-xl text-center mt-[15px]">
            No questions found
          </div>
        ) : (
        <div className="flex flex-col gap-[10px]">
          {filteredQuestions.slice(start, end).map((question) => (
            <PendingQuestion key={question.id} question={question} />
            ))}
          </div>
        )
      )}

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

function PendingQuestion({ question }) {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 760;

  if (!question) {
    return <div>Loading...</div>;
  }

  let trimmedQuestion = question.content.split(" ").slice(0, 30).join(" ");
  if (trimmedQuestion.length < question.content.length) {
    trimmedQuestion = trimmedQuestion + "...";
  }

  if (isSmallScreen) {
    return (
      <div className="flex flex-col w-full dark:text-white text-[14px] gap-2 pb-3 border-b border-light-border dark:border-dark-border">
        {/* Top: Question number and content */}
        <div className="flex gap-[10px] w-full">
          <div>{question.id}.</div>
          <div className="flex-1">{trimmedQuestion}</div>
        </div>
        {/* Bottom: Topic name on left, button on right */}
        <div className="flex w-full justify-between items-center gap-4">
          <div className="flex gap-2 items-center ml-[20px]">
            <div className="flex items-center justify-center bg-[rgba(230,230,230,1)] dark:bg-dark-highlight text-[11px] py-[2px] px-[5px] h-fit rounded-[5px] whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">
              {question.topic_name}
            </div>
          </div>
          <button
            className="flex justify-center items-center transition-colors bg-[rgba(230,230,230,1)] dark:bg-dark-highlight min-w-[140px] text-[13px] h-fit py-[5px] rounded-[5px] dark:text-white border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover"
          >
            {question.answered ? "View Answer" : "Review and Edit"}
          </button>
        </div>
      </div>
    );
  }

  // Large screen layout (unchanged)
  return (
    <div className="flex items-start dark:text-white text-[14px] pb-3 border-b border-light-border dark:border-dark-border">
      <div className="flex gap-[10px] w-full items-start">
        <div>{question.id}.</div>
        <div className="flex-1">{question.content}</div>
        <div className="flex items-center justify-center bg-[rgba(230,230,230,1)] dark:bg-dark-highlight text-[11px] py-[2px] px-[5px] h-fit rounded-[5px] ml-[5px] whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">
          {question.topic_name}
        </div>
        <button
          className="flex justify-center items-center transition-colors bg-[rgba(230,230,230,1)] dark:bg-dark-highlight w-[135px] text-[13px] h-fit py-[5px] rounded-[5px] ml-[20px] dark:text-white border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover"
          style={{ minWidth: 100 }}
        >
          {question.answered ? "View Answer" : "Review and Edit"}
        </button>
      </div>
    </div>
  );
}