import React from "react";

export default function Pending() {
  return (
    <div className="flex flex-col gap-[20px] p-[30px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white rounded-[10px]">
      <h1 className="text-[20px] font-medium">Pending Questions</h1>
      <p className="text-gray-500 dark:text-dark-text-muted">No pending questions at the moment.</p>
    </div>
  );
}
