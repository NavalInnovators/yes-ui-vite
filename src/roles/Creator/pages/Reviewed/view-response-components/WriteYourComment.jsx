import { CKEditor } from "ckeditor4-react";
import { useContext } from "react";
import CommentTextContext from "../../context/CommentTextContext";
import { useDarkMode } from "../../../../Reviewer/context/DarkModeContext";
import QuestionContext from "../../context/QuestionContext";
import StarRating from "../../../../Reviewer/components/StarRating";

export default function WriteYourComment() {
  const { commentText, setCommentText } = useContext(CommentTextContext);
  const { isDarkMode } = useDarkMode();
  const { question } = useContext(QuestionContext);

  // Determine color based on approval status (same logic as Reviewer)
  let color;
  if (question?.approved === "In Progress") {
    color = "bg-red-100 text-red-500";
  } else if (question?.approved === "Accepted") {
    color = "bg-green-200 text-green-600";
  } else {
    color = "bg-yellow-100 text-yellow-600";
  }

  return (
    <div className="flex flex-col flex-4 dark:bg-dark-card dark:text-white dark:border dark:border-dark-border bg-[#fff] py-[20px] px-[25px] rounded-[10px] gap-[15px] h-full">
      <h1 className="text-sm font-semibold">Your Response</h1>



      <div className="dark:bg-dark-highlight bg-light-card p-[25px] rounded-[6px]">
        <div className="flex justify-between items-center border-b-[1px] border-light-border dark:border-dark-border pb-[20px] mb-[20px]">
          <div className="flex items-center gap-[10px]">
            <p className={`text-sm font-semibold ${color} px-[10px] py-[2px] rounded-[5px] w-fit`}>
              {question?.approved}
            </p>
            {question?.approved === "Accepted" ?
              <p className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-[10px] py-[2px] rounded-[5px] w-fit">
                {question?.stars} Star
              </p>
              : null}
          </div>
        </div>

        <div className="text-sm leading-6 text-gray-700 dark:text-gray-300">
          <p>
            This is where the user's answer will be displayed. The answer should be well-structured,
            comprehensive, and provide clear explanations to the question. It should include relevant
            examples, code snippets if applicable, and follow best practices for the given topic.
          </p>
        </div>
      </div>
    </div>
  );
}
