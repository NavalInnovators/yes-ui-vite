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

  return (
    <div className="flex justify-between items-start dark:text-white">
      {/* Left */}
      <div className="flex gap-[10px]">
        {/* Question Number */}
        <div>{question.id}.</div>

        {/* Question Text */}
        <div className="flex-1">{question.content}</div>

        {/* Topic Name */}
        <div className="flex items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted justify-center font-light bg-[rgba(230,230,230,1)] text-[12px] h-[24px] p-[5px] rounded-[5px]">
          {question.topic_name}
        </div>

        {/* No of Answers Submitted */}
        <div className="flex w-[60px] dark:bg-dark-more-highlighted dark:text-dark-text-muted items-center relative justify-center gap-[5px] font-light bg-[rgba(230,230,230,1)] text-[14px] h-[24px] p-[5px] rounded-[5px]">
          <div>{question.answers_submitted_by_user}/3</div>
          <Info
            size={15}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverGone}
          />

          {openToolTip && <HoverInfo />}
        </div>

        {/* Status */}
        <Link
          to={question.status === "Draft" ? `/qna/${question.id}` : ""}
          className="flex justify-center transition-colors dark:border-[1px] dark:border-dark-border dark:hover:bg-dark-hover dark:bg-dark-highlight dark:text-white cursor-pointer items-center bg-[rgba(230,230,230,1)] text-[15px] w-[170px] h-[35px] rounded-[5px] ml-[20px]"
        >
          {question.status}
        </Link>
      </div>
    </div>
  );
}
