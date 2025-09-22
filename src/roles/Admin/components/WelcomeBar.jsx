import { useContext } from "react";
import GradientDiv from "../../components/GradientDiv";
import WindowWidthContext from "../context/WindowWidthContext";

export default function WelcomeBar() {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1020;

  const headingSize = smallScreen ? "text-[18px]" : "text-[20px]";
  const rolePadding = smallScreen ? "px-[6px] py-[1px]" : "px-[10px] py-[2px]";
  const newUpdatesSize = smallScreen ? "text-[12px]" : "text-[14px]";

  return (
    <GradientDiv>
      <div className="flex items-center">
        <p className={`${headingSize} pr-[10px] font-medium`}>
          Welcome, Sachin!
        </p>

        <p
          className={`${rolePadding} text-[11px] border-[1px] border-[#7863cb] font-extralight rounded-[27px]`}
        >
          Admin
        </p>
      </div>

      <p className={`${newUpdatesSize}`}>New Updates</p>
    </GradientDiv>
  );
}
