function TotalX({ x, n }) {
  return (
    <div className="text-[hsl(0,0%,50%)] dark:text-dark-text-muted">
      <p className="font-light text-[13px]">Total {x}</p>
      <p className="text-black dark:text-white font-medium text-[18px]">{n}</p>
    </div>
  );
}

export default function CreatorAnalytics() {
  return (
    <div className="w-[60%] h-fit rounded-[10px] px-[20px] py-[20px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white flex flex-col gap-[15px]">
      <h1 className="text-[16px] font-medium border-b border-light-border dark:border-dark-border pb-[15px]">Creator Analytics</h1>
      
      <div className="border-b border-light-border dark:border-dark-border pb-[15px]">
        <h2 className="text-[14px] font-medium mb-[15px]">Total Submissions</h2>

        <div className="flex items-center justify-between gap-[15px]">
          <TotalX x={"Answers"} n={30} />
          <TotalX x={"Accepted"} n={18} />
          <TotalX x={"Rejected"} n={12} />
        </div>
      </div>

      <div className="pt-[5px]">
        <h2 className="text-[14px] font-medium mb-[15px]">In Review</h2>

        <TotalX x="In Pending" n={30} />
      </div>
    </div>
  );
}
