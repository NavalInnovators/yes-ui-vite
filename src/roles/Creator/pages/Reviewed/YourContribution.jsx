import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Outlet, Link } from "react-router-dom";

import SearchBar from "../../../components/SearchBar";
import SelectTopic from "../../../components/SelectTopic";
import Pagination from "../../../components/pagination/Pagination";
import { fuzzySearch } from "../../../Reviewer/lib/fuzzySearch";
import ReviewAndEditOnly from "../../components/ReviewAndEditOnly";

// Context
import QuestionsContext from "../../context/QuestionsContext";
import WindowWidthContext from "../../context/WindowWidthContext";
import useLine from "../../../components/custom_hooks/useLine";

export default function YourContribution() {
  const { questions, isLoading } = useContext(QuestionsContext);
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 760;
  const is600px = windowWidth < 600;
  const line = useLine();
  
  const padding = is600px ? "p-[17px]" : "p-[20px]";
  
  const [reviewedQuestions, setReviewedQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select a Topic");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewAndEditOnly, setReviewAndEditOnly] = useState(false);

  useEffect(() => {
    const reviewed = questions.filter(q => q.reviewed === true);

    setReviewedQuestions(reviewed);
    setFilteredQuestions(reviewed);
  }, [questions]);

  // Search Functionality
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredQuestions(reviewedQuestions);
      setCurrentPage(1);
      return;
    }

    setSelectedOption("All");
    setCurrentPage(1);

    setFilteredQuestions(
      reviewedQuestions.filter((q) => fuzzySearch(searchQuery, q.content))
    );
  }, [searchQuery, reviewedQuestions]);

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
    const filteredByTopicName = reviewedQuestions.filter(
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
      setFilteredQuestions(reviewedQuestions);
    } else {
      setFilteredQuestions(reviewedQuestions.filter(q => q.answered === false));
    }
  }

  return (
    <>
      <Outlet />
      <motion.div
        initial={{ x: "-1%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        className={`w-full dark:bg-dark-card dark:text-gray-300 dark:border-dark-border flex flex-col gap-[15px] border border-gray-300 ${padding} rounded-[10px]`}
      >
        <h1 className={`text-[18px] font-semibold ${line}`}>Your Contribution</h1>

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
              <ReviewedQuestion key={question.id} question={question} />
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
    </>
  );
}

function ReviewedQuestion({ question }) {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 760;
  const is600px = windowWidth < 600;

  if (!question) {
    return <div>Loading...</div>;
  }

  let trimmedQuestion = question.content.split(" ").slice(0, 30).join(" ");
  if (trimmedQuestion.length < question.content.length) {
    trimmedQuestion = trimmedQuestion + "...";
  }

  // Determine color based on approved status
  let color;
  if (question.approved === "In Progress") {
    color = "bg-red-100 text-red-500";
  } else if (question.approved === "Accepted") {
    color = "bg-green-100 text-green-500";
  } else {
    color = "bg-yellow-100 text-yellow-600";
  }

  if (isSmallScreen) {
    return (
      <div className="flex flex-col w-full dark:text-white text-[14px] gap-2 pb-3 border-b border-light-border dark:border-dark-border">
        {/* Top: Question number and content */}
        <div className="flex gap-[10px] w-full">
          <div>{question.id}.</div>
          <div className="flex-1">{trimmedQuestion}</div>
        </div>
        {/* Bottom: Status and stars on left, button on right */}
        <div className="flex w-full justify-between items-center gap-4">
          <div className={`flex ${is600px ? "flex-col gap-[5px]" : "gap-2"} items-center ml-[20px]`}>
            {/* Status */}
            <div className={`flex items-center w-[85px] justify-center ${color} text-[11px] h-fit py-[2px] rounded-[5px]`}>
              {question.approved}
            </div>
            {/* Stars for Accepted questions */}
            {question.approved === "Accepted" && (
              <div className="w-[85px] flex items-center text-yellow-600 bg-yellow-100 justify-center text-[11px] h-fit py-[2px] rounded-[5px]">
                {question.stars} Star
              </div>
            )}
          </div>
          <Link
            to={`view-response/${question.id}`}
            className="flex justify-center items-center transition-colors bg-[rgba(230,230,230,1)] dark:bg-dark-highlight min-w-[140px] text-[13px] h-fit py-[5px] rounded-[5px] dark:text-white border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover"
          >
            View Response
          </Link>
        </div>
      </div>
    );
  }

  // Large screen layout
  return (
    <div className="flex items-start dark:text-white text-[14px] pb-3 border-b border-light-border dark:border-dark-border">
      <div className="flex gap-[10px] w-full items-start">
        <div>{question.id}.</div>
        <div className="flex-1">{question.content}</div>
        
        {/* Status and Stars */}
        <div className="flex flex-col items-center gap-[3px] font-bold">
          <div
            className={`flex items-center w-[85px] justify-center ${color} text-[11px] h-fit py-[2px] rounded-[5px]`}
          >
            {question.approved}
          </div>

          {question.approved === "Accepted" ? (
            <div className="w-[85px] flex items-center text-yellow-600 bg-yellow-100 justify-center text-[11px] h-fit py-[2px] rounded-[5px]">
              {question.stars} Star
            </div>
          ) : (
            ""
          )}
        </div>

        <Link
          to={`view-response/${question.id}`}
          className="flex justify-center items-center transition-colors bg-[rgba(230,230,230,1)] dark:bg-dark-highlight w-[135px] text-[13px] h-fit py-[5px] rounded-[5px] ml-[20px] dark:text-white border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover"
          style={{ minWidth: 100 }}
        >
          View Response
        </Link>
      </div>
    </div>
  );
}
