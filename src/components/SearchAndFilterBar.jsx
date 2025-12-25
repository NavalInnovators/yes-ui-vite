import React, { useState } from "react";
import { SearchIconFaq } from "../assets";

const SearchAndFilterBar = ({
  searchQuery,
  onSearch,
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const handleMobileSearch = (value) => {
    setMobileSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="bg-[#ffffff] border-b border-gray-200">
      {/* Mobile Layout*/}
      <div className="block lg:hidden">
        <div className="p-4 flex">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full px-4 py-3 pr-12 border-y-2 border-l-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-zinc-900 text-sm placeholder-gray-500"
              placeholder="Search Courses"
              value={mobileSearchQuery}
              onChange={(e) => handleMobileSearch(e.target.value)}
            />
          </div>
          <button className="bg-zinc-900 rounded-r-lg px-5 py-1">
              <img className="w-5 h-5" src={SearchIconFaq} alt="search-icon" />
            </button>
        </div>
        
        <div className="px-4 pb-4">
          <div className="text-base font-semibold text-gray-700 mb-3">
            Categories of what are you looking for
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                onClick={() => onCategorySelect?.(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-20 px-12 py-4">
        <div className="w-2/5 flex">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full px-4 py-3 pr-12 border-y-2 border-l-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-zinc-900 text-sm placeholder-gray-500"
              placeholder="Search Courses"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="px-5 py-3 bg-zinc-900 rounded-r-lg">
              <img className="w-5 h-5" src={SearchIconFaq} alt="search-icon" />
            </button>
        </div>

        <div className="w-3/5">
          <div className="flex items-center justify-end gap-4">
            <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Categories:
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                  onClick={() => onCategorySelect?.(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;