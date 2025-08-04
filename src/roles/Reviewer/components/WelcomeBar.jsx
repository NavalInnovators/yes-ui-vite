import useSmallScreen from "../../components/custom_hooks/useSmallScreen";
import GradientDiv from "../../components/GradientDiv";

export default function WelcomeBar() {
  const smallScreen = useSmallScreen();

  const headingSize = smallScreen ? "text-[18px]" : "text-[20px]";
  const rolePadding = smallScreen ? "px-[6px] py-[1px]" : "px-[10px] py-[2px]";
  const newUpdatesSize = smallScreen ? "text-[12px]" : "text-[14px]";

  return (
    <GradientDiv>
      <div className="flex items-center">
        <p className={`${headingSize} pr-[10px] font-medium`}>
          Welcome, Raman!
        </p>

        <p
          className={`${rolePadding} text-[11px] border-[1px] border-[#7863cb] font-extralight rounded-[27px]`}
        >
          Reviewer
        </p>
      </div>

      <p className={`${newUpdatesSize}`}>New Updates</p>
    </GradientDiv>
  );
}
