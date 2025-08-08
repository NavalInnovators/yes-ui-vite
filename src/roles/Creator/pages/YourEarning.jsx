export default function YourEarning() {
  return (
    <div className="flex flex-col gap-[20px] p-[30px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white rounded-[10px]">
      <h1 className="text-[20px] font-medium">Your Earnings</h1>
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-dark-text-muted">Total Earnings:</span>
          <span className="text-2xl font-bold">₹999</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-dark-text-muted">This Month:</span>
          <span className="text-lg">₹150</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-dark-text-muted">Last Month:</span>
          <span className="text-lg">₹849</span>
        </div>
      </div>
    </div>
  );
}
