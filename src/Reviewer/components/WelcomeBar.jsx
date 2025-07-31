export default function WelcomeBar() {
  return (
    <div className="bg-gradient-to-r from-[#381AB2] via-[#9B32AD] to-[#FEAC2F] py-[20px] px-[25px] text-white flex items-center justify-between">
      <div className="flex items-center">
        <p className="text-[25px] pr-[15px] font-medium">Welcome, Raman!</p>

        <p className="border-[1px] border-[#7863cb] py-[5px] px-[15px] rounded-[27px] text-[13px]">
          Reviewer
        </p>
      </div>

      <p>New Updates</p>
    </div>
  );
}
