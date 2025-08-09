import { useContext } from "react";
import WindowWidthContext from "../context/WindowWidthContext";

export default function ReviewAndEditOnly({ reviewAndEditOnlyFilter, reviewAndEditOnly }) {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 430;
  
  const textSize = isSmallScreen ? "text-[10px]" : "text-[14px]";
  const padding = isSmallScreen ? "py-[10px] px-[10px]" : "py-[7px] px-[15px]";
  
  return (
    <div
      className={`outline-none rounded-[7px] border-none ${textSize} cursor-pointer font-medium placeholder:text-black ${padding} ${
        reviewAndEditOnly
          ? "bg-purple text-white dark:bg-purple dark:text-white"
          : "bg-[rgba(230,230,230,1)] transition-transform hover:scale-[1.07] text-black dark:bg-dark-highlight dark:text-white dark:hover:bg-dark-hover"
      }`}
      onClick={reviewAndEditOnlyFilter}
    >
      Review and Edit
    </div>
  );
}
