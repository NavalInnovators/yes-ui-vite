import { Link } from "react-router-dom";
import GradientDiv from "../../../../components/GradientDiv";
import useSmallScreen from "../../../../components/custom_hooks/useSmallScreen";

export default function TopGradientBar() {
  const smallScreen = useSmallScreen();
  const headingSize = smallScreen ? "text-[18px]" : "text-[22px]";

  return (
    <GradientDiv>
      <h1 className={`${headingSize}`}>Submit Answer</h1>
      <Link
        to="/reviewer/new_qna"
        className="text-sm transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </Link>
    </GradientDiv>
  );
}
