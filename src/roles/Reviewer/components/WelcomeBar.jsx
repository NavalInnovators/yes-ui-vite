import GradientDiv from "../../components/GradientDiv";

export default function WelcomeBar() {
  return (
    <GradientDiv>
      <div className="flex items-center">
        <p className="text-[25px] pr-[15px] font-medium">Welcome, Raman!</p>

        <p className="border-[1px] border-[#7863cb] py-[5px] px-[15px] rounded-[27px] text-[13px]">
          Reviewer
        </p>
      </div>
    </GradientDiv>
  );
}
