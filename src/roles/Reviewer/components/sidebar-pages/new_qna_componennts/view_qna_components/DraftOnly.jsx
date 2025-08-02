export default function DraftOnly({ draftOnlyFilter, draftOnly }) {
  return (
    <div
      className={`outline-none rounded-[7px] border-none text-[16px] cursor-pointer font-medium placeholder:text-black  py-[9px] px-[15px] ${
        draftOnly
          ? "bg-black text-white dark:bg-white dark:text-black "
          : "bg-[rgba(230,230,230,1)] transition-transform hover:scale-[1.07] text-black dark:bg-dark-highlight dark:text-white dark:hover:bg-dark-hover"
      }`}
      onClick={draftOnlyFilter}
    >
      Draft Only
    </div>
  );
}
