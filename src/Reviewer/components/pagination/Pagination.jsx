import { ArrowLeft, ArrowRight, LucideImageMinus } from "lucide-react";
import Page from "./Page";

export default function Pagination({
  totalQuestions,
  PAGE_SIZE,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalQuestions / PAGE_SIZE);

  const paginationArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  let buttonStart = currentPage - 3;
  let buttonEnd = currentPage + 2;

  if (buttonStart < 1) {
    buttonStart = 0;
  }

  if (buttonEnd > totalPages) {
    buttonEnd = totalPages;
  }

  let limitedButtonsArray = paginationArray.slice(buttonStart, buttonEnd);

  if (limitedButtonsArray[limitedButtonsArray.length - 1] < totalPages) {
    limitedButtonsArray = [...limitedButtonsArray, "...", totalPages];
  }

  function handleNextButton() {
    setCurrentPage((prev) => prev + 1);
  }

  function handlePreviousButton() {
    setCurrentPage((prev) => prev - 1);
  }

  function handlePageClick(page) {
    setCurrentPage(page);
  }

  return (
    <div className="flex justify-center items-center gap-[20px]">
      {currentPage > 1 && (
        <button
          className="flex items-center dark:hover:text-white text-gray-400 dark:text-dark-text-muted transition duration-100 text-[18px] gap-[5px] cursor-pointer hover:text-black"
          onClick={handlePreviousButton}
        >
          <ArrowLeft size={22} />
          Previous
        </button>
      )}

      <div className="flex items-center gap-[5px]">
        {limitedButtonsArray.map((page) =>
          page === "..." ? (
            <span key={page} className="mx-[5px]">
              ...
            </span>
          ) : (
            <Page
              key={page}
              page={page}
              onClick={() => handlePageClick(page)}
              currentPage={currentPage}
            />
          )
        )}
      </div>

      {currentPage < totalPages && (
        <button
          className="flex items-center dark:hover:text-white dark:text-dark-text-muted text-gray-400 text-[18px] transition duration-100 gap-[5px] cursor-pointer hover:text-black"
          onClick={handleNextButton}
        >
          Next
          <ArrowRight />
        </button>
      )}
    </div>
  );
}
