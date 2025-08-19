import { useContext } from "react";
import { Link } from "react-router-dom";
import GradientDiv from "../../../components/GradientDiv";
import WindowWidthContext from "../../context/WindowWidthContext";

export default function TopGradientBar() {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1020;
  const headingSize = smallScreen ? "text-[18px]" : "text-[22px]";

  return (
    <GradientDiv>
      <h1 className={`${headingSize}`}>Review and Edit</h1>
      <Link
        to="/creator/pending"
        className="text-sm transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </Link>
    </GradientDiv>
  );
}
