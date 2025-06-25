import React, { useState } from "react";
import "./SearchBar.css";
import { SearchIconFaq } from "../assets";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle input change and call onSearch immediately
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the updated query to the parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search Courses"
        value={query}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={() => onSearch(query)}>
        <img className="search-img" src={SearchIconFaq} alt="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
