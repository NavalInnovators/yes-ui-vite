import { Search } from "lucide-react";

export default function SearchBar({ filterBySearch, searchQuery }) {
  return (
    <div className="dark:bg-dark-highlight flex flex-1 items-center bg-[rgba(230,230,230,1)] pr-[15px] rounded-[7px] cursor-pointer">
      <input
        type="text"
        className="dark:bg-dark-highlight dark:placeholder:text-white dark:text-white bg-[rgba(230,230,230,1)] w-full outline-none rounded-[7px] border-none text-[16px] font-light placeholder:text-black text-text-black py-[9px] px-[15px]"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => filterBySearch(e)}
        value={searchQuery}
      />

      <Search size={19} className="dark:text-white" />
    </div>
  );
}
