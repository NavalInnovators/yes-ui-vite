import { useContext } from "react";
import { Link } from "react-router-dom";
import GradientDiv from "../../../../components/GradientDiv";
import WindowWidthContext from "../../../context/WindowWidthContext";

export default function ViewTopGradientBar() {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1020;
  const headingSize = smallScreen ? "text-[18px]" : "text-[22px]";

  return (
    <GradientDiv>
      <h1 className={`${headingSize}`}>View Comment</h1>
      <Link
        to="/reviewer/reviewed_qna"
        className="text-sm transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </Link>
    </GradientDiv>
  );
}