import Question from "./Question";
import UserAnswer from "./UserAnswer";
import ProvideRating from "./ProvideRating";
import WriteYourComment from "./WriteYourComment";

export default function Section() {
  return (
    <div className="flex p-[20px] gap-[10px] bg-light-card min-h-[calc(100vh-65px-85px)]">
      {/* Left Div */}
      <div className="flex flex-col gap-[10px] w-[64%] rounded-[10px]">
        <Question />
        <UserAnswer />
      </div>

      {/* Right Div */}
      <div className="flex flex-1 flex-col gap-[10px] text-[18px]">
        <ProvideRating />
        <WriteYourComment />
      </div>
    </div>
  );
}
