function Tag({ color, text }) {
  return <div className={`${color}`}>{text}</div>;
}

export default function Question({ question }) {
  const dark_bg_button = "#212121";

  let color;

  if (question.approved === "In Progress") {
    color = "bg-red-100 text-red-500";
  } else if (question.approved === "Accepted") {
    color = "bg-green-100 text-green-500";
  } else {
    color = "bg-yellow-100 text-yellow-600";
  }

  return (
    <div className="flex justify-between items-start dark:text-white">
      {/* Left */}
      <div className="flex gap-[10px]">
        {/* Question Number */}
        <div>{question.id}.</div>

        {/* Question Text */}
        <div className="flex-1">{question.content}</div>

        {/* Status*/}
        <div className="flex flex-col items-center gap-[3px] font-bold">
          <div
            className={`flex items-center w-[100px] justify-center ${color} text-[13px] h-[24px] p-[5px] rounded-[5px]`}
          >
            {question.approved}
          </div>

          {question.approved === "Accepted" ? (
            <div className="w-[100px] flex items-center text-yellow-600 bg-yellow-100 justify-center text-[13px] h-[24px] p-[5px] rounded-[5px]">
              {question.stars}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Status */}
        <button
          className={`flex justify-center hover:border-[1px] dark:hover:border-[1px] dark:hover:border-dark-border dark:hover:bg-dark-hover dark:bg-dark-highlight dark:text-white cursor-pointer items-center bg-[rgba(230,230,230,1)] text-[15px] w-[155px] h-[35px] rounded-[5px] ml-[20px]`}
        >
          View Comment
        </button>
      </div>
    </div>
  );
}
