export default function Page({ page, onClick, currentPage }) {
  return (
    <button
      className={`flex items-center justify-center text-[13px] w-[30px] h-[30px] transition duration-100 rounded-[10px] cursor-pointer ${
        currentPage === page
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-black dark:bg-dark-highlight dark:text-dark-text-muted dark:hover:bg-dark-hover"
      }`}
      onClick={onClick}
    >
      {page}
    </button>
  );
}
