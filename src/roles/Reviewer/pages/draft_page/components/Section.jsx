import Question from "./Question";
import UserAnswer from "./UserAnswer";
import ProvideRating from "./ProvideRating";
import WriteYourComment from "./WriteYourComment";

export default function Section() {
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
        <WriteYourComment />
      </div>
    </div>
  );
}
