
export default function ReviewAndEditOnly({ reviewAndEditOnlyFilter, reviewAndEditOnly }) {
  return (
    <div
      className={`outline-none rounded-[7px] border-none text-[14px] cursor-pointer font-medium placeholder:text-black py-[7px] px-[15px] ${
        reviewAndEditOnly
          ? "bg-purple text-white dark:bg-white dark:text-black "
          : "bg-[rgba(230,230,230,1)] transition-transform hover:scale-[1.07] text-black dark:bg-dark-highlight dark:text-white dark:hover:bg-dark-hover"
      }`}
      onClick={reviewAndEditOnlyFilter}
    >
      Review and Edit
    </div>
  );
}
