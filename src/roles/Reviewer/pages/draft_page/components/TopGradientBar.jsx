import { Link } from "react-router-dom";
import GradientDiv from "../../../../components/GradientDiv";

export default function TopGradientBar() {
  return (
    <GradientDiv>
      <h1 className="text-[30px]">Submit Answer</h1>
      <Link
        to="/reviewer/new_qna"
        className="text-[18px] transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </Link>
    </GradientDiv>
  );
}
