import Question from "./Question";
import UserAnswer from "./UserAnswer";
import ProvideRating from "./ProvideRating";
import WriteYourComment from "./WriteYourComment";

export default function Section({ showEditor = true }) {
  return (
    <div className="dark:bg-black w-full lg:flex p-[20px] gap-[10px] min-h-[calc(100vh-63px-51px)] bg-light-card">
      {/* Left Div */}
      <div className="flex flex-col gap-[10px] lg:w-[56%] rounded-[10px]">
        <Question />
        <UserAnswer />
      </div>

      {/* Right Div */}
      <div className="flex flex-1 flex-col gap-[10px] lg:mt-[0px] mt-[10px]">
        <ProvideRating />
        {showEditor ? (
          <WriteYourComment />
        ) : (
          <div className="dark:bg-dark-card dark:text-white dark:border dark:border-dark-border bg-[#fff] py-[20px] px-[25px] rounded-[10px] flex flex-col flex-1 gap-[15px]">
            <h1 className="text-sm font-semibold">Your Response</h1>
            <div className="dark:bg-dark-highlight p-[25px] rounded-[6px] text-sm leading-6 text-gray-700 dark:text-gray-300">
              {`Thank you for your submission. After careful review, this response has been finalized. The content is clear, well-structured, and meets our quality standards. No further changes are required at this time. If new information arises, we will update the decision accordingly. Thank you for your submission. After careful review, this response has been finalized. The content is clear, well-structured, and meets our quality standards. No further changes are required at this time. If new information arises, we will update the decision accordingly. Thank you for your submission. After careful review, this response has been finalized. The content is clear, well-structured, and meets our quality standards. No further changes are required at this time. If new information arises, we will update the decision accordingly.`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
