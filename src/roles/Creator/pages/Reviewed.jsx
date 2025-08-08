export default function Reviewed() {
  return (
    <div className="flex flex-col gap-[20px] p-[30px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white rounded-[10px]">
      <h1 className="text-[20px] font-medium">Reviewed Questions</h1>
      <p className="text-gray-500 dark:text-dark-text-muted">No reviewed questions at the moment.</p>
    </div>
  );
}
