import { Info } from "lucide-react";
import HoverInfo from "./HoverInfo";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Question({ question }) {
  const [openToolTip, setOpenToolTip] = useState(false);

  function handleHover() {
    setOpenToolTip(true);
  }

  function handleHoverGone() {
    setOpenToolTip(false);
  }

  let trimmedQuestion = question.content.split(" ").slice(0, 30).join(" ");
  // If the question is longer than 24 words, append "..." to indicate truncation
  if (trimmedQuestion.length < question.content.length) {
    trimmedQuestion = trimmedQuestion + "...";
  }

  return (
    <div className="flex items-start dark:text-white text-[14px]">
      {/* Left */}
      <div className="flex gap-[10px]">
        {/* Question Number */}
        <div>{question.id}.</div>

        {/* Question Text */}
        <div className="flex-1">{trimmedQuestion}</div>

        {/* Topic Name */}
        <div className="flex items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted justify-center bg-[rgba(230,230,230,1)] text-[11px] py-[2px] px-[5px] h-fit rounded-[5px] ml-[5px]">
          {question.topic_name}
        </div>

        {/* No of Answers Submitted */}
        <div className="flex dark:bg-dark-more-highlighted dark:text-dark-text-muted items-center relative justify-center gap-[5px] font-light bg-[rgba(230,230,230,1)] text-[11px] h-fit py-[2px] px-[5px] rounded-[5px]">
          <div>{question.answers_submitted_by_user}/3</div>
          <Info
            size={10}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverGone}
          />

          {openToolTip && <HoverInfo />}
        </div>

        {/* Status */}
        <Link
          to={question.status === "Draft" ? `qna/${question.id}` : ""}
          className="flex justify-center transition-colors dark:border-[1px] dark:border-dark-border dark:hover:bg-dark-hover dark:bg-dark-highlight dark:text-white cursor-pointer items-center bg-[rgba(230,230,230,1)] text-[13px] w-[135px] h-fit py-[5px] rounded-[5px] ml-[20px]"
        >
          {question.status}
        </Link>
      </div>
    </div>
  );
}
