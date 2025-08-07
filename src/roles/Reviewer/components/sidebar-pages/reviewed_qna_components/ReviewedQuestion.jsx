import useLine from "../../../../components/custom_hooks/useLine";
import { useContext } from "react";
import WindowWidthContext from "../../../context/WindowWidthContext";

function Tag({ color, text }) {
  return <div className={`${color}`}>{text}</div>;
}

export default function Question({ question }) {
  const dark_bg_button = "#212121";

  const windowWidth = useContext(WindowWidthContext);
  const smallerThan600px = windowWidth < 600;
  const line = useLine();

  let color;

  if (question.approved === "In Progress") {
    color = "bg-red-100 text-red-500";
  } else if (question.approved === "Accepted") {
    color = "bg-green-100 text-green-500";
  } else {
    color = "bg-yellow-100 text-yellow-600";
  }

  return (
    <div
      className={`flex justify-between items-start dark:text-white text-[14px] ${line}`}
    >
      {/* Left */}
      <div className={`flex ${smallerThan600px && "flex-col"}  gap-[10px]`}>
        <div className="flex items-start gap-[5px]">
          {/* Question Number */}
          <div>{question.id}.</div>

          {/* Question Text */}
          <div className="flex-1">{question.content}</div>
        </div>

        <div className="flex items-start justify-end">
          {/* Status*/}
          <div className="flex flex-col items-center gap-[3px] font-bold">
            <div
              className={`flex items-center w-[85px] justify-center ${color} text-[11px] h-fit py-[2px] rounded-[5px]`}
            >
              {question.approved}
            </div>

            {question.approved === "Accepted" ? (
              <div className="w-[85px] flex items-center text-yellow-600 bg-yellow-100 justify-center text-[11px] h-fit py-[2px] rounded-[5px]">
                {question.stars}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Status */}
          <button
            className={`flex text-[13px] h-fit py-[5px] justify-center border-[1px] dark:border-dark-border border-[rgba(230,230,230,1)] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover dark:bg-dark-highlight dark:text-white cursor-pointer items-center bg-[rgba(230,230,230,1)] min-w-[125px] rounded-[5px] ml-[10px]`}
          >
            View Comment
          </button>
        </div>
      </div>
    </div>
  );
}
