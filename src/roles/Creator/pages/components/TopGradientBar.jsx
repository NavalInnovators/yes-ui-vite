import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import GradientDiv from "../../../components/GradientDiv";
import WindowWidthContext from "../../context/WindowWidthContext";

export default function TopGradientBar() {
  const windowWidth = useContext(WindowWidthContext);
  const location = useLocation();
  const smallScreen = windowWidth < 1020;
  const headingSize = smallScreen ? "text-[18px]" : "text-[22px]";

  // Determine if we're in ViewAnswer or SubmitAnswer
  const isViewAnswer = location.pathname.includes("view-answer");
  const title = isViewAnswer ? "View Answer" : "Submit Answer";
  const backPath = isViewAnswer ? "/creator/pending" : "/creator/new_qna";

  return (
    <GradientDiv>
      <h1 className={`${headingSize}`}>{title}</h1>
      <Link
        to={backPath}
        className="text-sm transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </Link>
    </GradientDiv>
  );
}
