import { useContext } from "react";
import { Search } from "lucide-react";
import WindowWidthContext from "../../roles/Reviewer/context/WindowWidthContext";

export default function SearchBar({ filterBySearch, searchQuery }) {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1020;

  const largePadding = "py-[7px] px-[15px]";
  const smallPadding = "py-[7px] px-[12px]";

  const padding = smallScreen ? smallPadding : largePadding;
  const textSize = smallScreen ? "text-[13px]" : "text-[14px]";

  return (
    <div className="dark:bg-dark-highlight flex flex-1 min-w-[130px] items-center bg-[rgba(230,230,230,1)] pr-[15px] rounded-[7px] cursor-pointer">
      <input
        type="text"
        className={`${padding} ${textSize} dark:bg-dark-highlight dark:placeholder:text-white dark:text-white bg-[rgba(230,230,230,1)] w-full outline-none rounded-[7px] border-none font-light placeholder:text-black text-text-black `}
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => filterBySearch(e)}
        value={searchQuery}
      />

      <Search size={16} className="dark:text-white" />
    </div>
  );
}
