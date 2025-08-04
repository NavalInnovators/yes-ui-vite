import GradientDiv from "../../components/GradientDiv";

export default function WelcomeBar() {
  return (
    <GradientDiv>
      <div className="flex items-center">
        <p className="text-[22px] pr-[10px] font-medium">Welcome, Raman!</p>

        <p className="border-[1px] border-[#7863cb] py-[4px] font-extralight px-[14px] rounded-[27px] text-[11px]">
          Reviewer
        </p>
      </div>

      <p className="text-[14px]">New Updates</p>
    </GradientDiv>
  );
}
