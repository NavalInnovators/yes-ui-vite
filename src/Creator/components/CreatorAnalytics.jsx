import Line from "../../Reviewer/components/Line";

function TotalX({ x, n }) {
  return (
    <div className="text-[hsl(0,0%,50%)]">
      <p className="font-light">Total {x}</p>
      <p className="text-black font-medium text-[22px]">{n}</p>
    </div>
  );
}
export default function CreatorAnalytics() {
  return (
    <div className="w-[600px] h-fit rounded-[8px] px-[35px] py-[30px] border-[1px] border-light-border flex flex-col gap-[20px]">
      <h1 className="text-[23px] font-medium">Creator Analytics</h1>
      <Line />
      <h2 className="text-[18px] font-medium">Total Submissions</h2>

      <div className="flex items-center justify-between">
        <TotalX x={"Answers"} n={30} />
        <TotalX x={"Accepted"} n={18} />
        <TotalX x={"Rejected"} n={12} />
      </div>

      <Line />

      <h2 className="text-[18px] font-medium">In Review</h2>

      <TotalX x="In Pending" n={30} />
    </div>
  );
}
