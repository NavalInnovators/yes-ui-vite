import { useContext } from "react";
import WindowWidthContext from "../../context/WindowWidthContext";
import Question from "./Question";
import WriteYourComment from "./WriteYourComment";
import ViewComments from "./ViewComments";

export default function Section({ showEditor = true, question }) {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 1100;

  return (
    <div className="dark:bg-black w-full lg:flex p-[20px] gap-[10px] min-h-[calc(100vh-63px-51px)] bg-light-card">
      {/* Left Div */}
      <div className={`flex ${isSmallScreen && "flex-col"} gap-[10px] w-full rounded-[10px]`}>
        <Question />
        <WriteYourComment />
        <ViewComments />
      </div>
    </div>
  );
}
