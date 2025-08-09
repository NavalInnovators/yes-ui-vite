import { useContext, useState } from "react";
import SelectTopic from "../../../components/SelectTopic";
import Pagination from "../../../components/pagination/Pagination";
import WindowWidthContext from "../../context/WindowWidthContext";
import { Eye } from "lucide-react";

export default function TopNavigationPanel({ setConfirmSubmit, renderActions = true, statusText }) {
  const [selectedTopic, setSelectedTopic] = useState("Select a Topic");
  const [selectedResponse, setSelectedResponse] = useState("View all Answers");
  const [currentPage, setCurrentPage] = useState(1);
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1100;
  const is800px = windowWidth < 800;
  const is500px = windowWidth < 500;

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

  const smallStyles = is800px ? "flex-col gap-[10px]" : "items-center gap-[10px]";
  const darkStyles = "dark:bg-dark-card"

  return (
    <div className={`flex ${darkStyles} ${smallStyles} ${smallScreen ? "justify-center" : "justify-between"} py-[10px] px-[25px]`}>
      {is500px ? (
        <div className="flex flex-col gap-[10px] w-full">
          <SelectTopic
            options={topics}
            filterByTopicName={filterByTopicName}
            selectedOption={selectedTopic}
            setSelectedOption={setSelectedTopic}
          />

          {renderActions && (
            <SelectTopic
              options={responses}
              filterByTopicName={filterByTopicName}
              selectedOption={selectedResponse}
              setSelectedOption={setSelectedResponse}
            />
          )}

          {renderActions ? (
            <div className="flex flex-col gap-[10px] w-full">
              <button
                className="transition-colors cursor-pointer border-[2px] border-green-200 hover:bg-green-200 py-[5px] px-[10px] text-green-600 rounded-[7px] flex items-center justify-center gap-[8px] w-full"
              >
                <Eye size={16} className="mt-[1px]"/>
                <span>Preview</span>
              </button>

              <button
                onClick={handleConfirmSubmit}
                className="transition-colors bg-green hover:bg-green-hover text-white hover:text-white rounded-[5px] cursor-pointer whitespace-nowrap bg-[#fff] dark:text-white py-[5px] px-[20px] relative w-full"
              >
                Edit and Submit Answer
              </button>
            </div>
          ) : (
            <div className="py-[4px] px-[10px] rounded-[7px] bg-gray-100 dark:bg-dark-more-highlighted text-gray-600 dark:text-gray-300 text-[11px] w-fit">
              {statusText}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={`flex ${renderActions ? "flex-2" : "flex-1"} items-center gap-[10px]`}>
            <SelectTopic
              options={topics}
              filterByTopicName={filterByTopicName}
              selectedOption={selectedTopic}
              setSelectedOption={setSelectedTopic}
            />

            {renderActions && (
              <SelectTopic
                options={responses}
                filterByTopicName={filterByTopicName}
                selectedOption={selectedResponse}
                setSelectedOption={setSelectedResponse}
              />
            )}
          </div>

          {!smallScreen && (
            <div className="flex-1">
              <Pagination
                totalQuestions={totalQuestions}
                PAGE_SIZE={4}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          <div
            className={`${
              smallScreen ? "justify-center flex-wrap" : ""
            } flex items-center gap-[3px] text-sm font-medium`}
          >
            {renderActions ? (
              <>
                <button
                  className={`${
                    smallScreen ? "flex-1" : ""
                  } transition-colors cursor-pointer border-[2px] border-green-200 hover:bg-green-200 py-[5px] px-[10px] text-green-600 rounded-[7px] flex items-center justify-center gap-[8px]`}
                >
                  <Eye size={16} className="mt-[1px]"/>
                  <span>Preview</span>
                </button>

                <button
                  onClick={handleConfirmSubmit}
                  className={`${
                    smallScreen ? "flex-2" : ""
                  } transition-colors ml-[10px] rounded-[5px] cursor-pointer whitespace-nowrap bg-green hover:bg-green-hover text-white py-[5px] px-[20px] relative`}
                >
                  Edit and Submit Answer
                </button>
              </>
            ) : (
              <div className="py-[4px] px-[10px] rounded-[7px] bg-gray-100 dark:bg-dark-more-highlighted text-gray-600 dark:text-gray-300 text-[11px] w-fit">
                {statusText}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
