import { Info } from "lucide-react";
import HoverInfo from "./HoverInfo";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import WindowWidthContext from "../context/WindowWidthContext";

export default function Question({ question, showOnlyTopic = false }) {
  const [openToolTip, setOpenToolTip] = useState(false);
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 800;

  if (!question) {
    return <div>Loading...</div>;
  }

  function handleHover() {
    setOpenToolTip(true);
  }

  function handleHoverGone() {
    setOpenToolTip(false);
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
        {/* Bottom: Topic name and answers on left, status button on right */}
        <div className="flex w-full justify-between items-center gap-2">
          <div className="flex gap-2 items-center ml-[20px]">
            <div className="flex items-center justify-center bg-[rgba(230,230,230,1)] dark:bg-dark-highlight text-[11px] py-[2px] px-[5px] h-fit rounded-[5px] whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">
              {question.topic_name}
            </div>
            {!showOnlyTopic && (
              <div className="flex items-center relative gap-[5px] font-light bg-[rgba(230,230,230,1)] dark:bg-dark-highlight text-[11px] h-fit py-[2px] px-[5px] rounded-[5px] whitespace-nowrap dark:text-white">
                <div>{question.answers_submitted_by_user}/3</div>
                <Info
                  size={10}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHoverGone}
                />
                {openToolTip && <HoverInfo />}
              </div>
            )}
          </div>
          {!showOnlyTopic && (
            <Link
              to={`submit-answer/${question.id}`}
              className="flex justify-center items-center transition-colors bg-[rgba(230,230,230,1)] dark:bg-dark-highlight min-w-[120px] text-[13px] h-fit py-[5px] rounded-[5px] dark:text-white border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover"
            >
              {question.status}
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Large screen layout (unchanged)
  return (
    <div className="flex items-start dark:text-white text-[14px] pb-3 border-b border-light-border dark:border-dark-border">
      <div className="flex gap-[10px] w-full items-start">
        <div>{question.id}.</div>
        <div className="flex-1">{trimmedQuestion}</div>
        <div className="flex items-center justify-center bg-[rgba(230,230,230,1)] dark:bg-dark-highlight text-[11px] py-[2px] px-[5px] h-fit rounded-[5px] ml-[5px] whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">
          {question.topic_name}
        </div>

        {!showOnlyTopic && (
          <div className="flex items-center relative gap-[5px] font-light bg-[rgba(230,230,230,1)] dark:bg-dark-highlight text-[11px] h-fit py-[2px] px-[5px] rounded-[5px] whitespace-nowrap dark:text-white">
            <div>{question.answers_submitted_by_user}/3</div>
            <Info
              size={10}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverGone}
            />
            {openToolTip && <HoverInfo />}
          </div>
        )}

        {!showOnlyTopic && (
          <Link
            to={`submit-answer/${question.id}`}
            className="flex justify-center items-center transition-colors bg-[rgba(230,230,230,1)] dark:bg-dark-highlight w-[135px] text-[13px] h-fit py-[5px] rounded-[5px] ml-[20px] dark:text-white border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover"
            style={{ minWidth: 100 }}
          >
            {question.status}
          </Link>
        )}
      </div>
    </div>
  );
}
