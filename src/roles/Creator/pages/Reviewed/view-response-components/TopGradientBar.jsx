import { useContext } from "react";
import { Link } from "react-router-dom";
import GradientDiv from "../../../../components/GradientDiv";
import WindowWidthContext from "../../../context/WindowWidthContext";

export default function TopGradientBar({ question }) {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1020;
  const headingSize = smallScreen ? "text-[18px]" : "text-[22px]";

  return (
    <GradientDiv>
      <div className="flex items-center gap-[10px]">
        <h1 className={`${headingSize}`}>View Response</h1>
        {question?.approved === "Accepted" ?
          <div className="flex items-center gap-[5px]">
            <p className="text-[12px] bg-green-200 text-green-600 px-[10px] py-[2px] rounded-[5px] w-fit">Accepted</p>
            <p className="text-[12px] font-semibold text-yellow-600 bg-yellow-100 px-[10px] py-[2px] rounded-[5px] w-fit">
              {question?.stars} Star
            </p>
          </div>
          : null}
      </div>

      <Link
        to="/creator/reviewed"
        className="text-sm transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </Link>
    </GradientDiv>
  );
}
