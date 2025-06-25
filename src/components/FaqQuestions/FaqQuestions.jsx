import { useState, useMemo, useEffect, memo, useCallback } from "react";
import "./FaqQuestions.css";
import { DownArrow } from "../../assets";
import { faqs } from "../../constants";

// Memoized FAQ item component to prevent unnecessary re-renders
const FaqItem = memo(({ faq, index, isActive, isLastItem, onClick }) => {
  return (
    <div
      className={`faq-item ${isActive ? "active" : ""} ${isLastItem ? "last-item" : ""}`}
      onClick={onClick}
    >
      <div className="faq-question">
        {faq.question}
        <span className={`toggle-icon ${isActive ? "rotate" : ""}`}>
          <img src={DownArrow} alt="DownArrow" />
        </span>
      </div>
      <div
        className={`faq-answer ${isActive ? "show" : ""}`}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );
});

const FaqQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  
  // Debounce search input to reduce re-renders while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 300); // 300ms delay
    
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const questionMatch = faq.question.toLowerCase().includes(debouncedSearchInput.toLowerCase());
      const answerMatch = faq.answer.toLowerCase().includes(debouncedSearchInput.toLowerCase());
      return questionMatch || answerMatch;
    });
  }, [debouncedSearchInput]);

  const toggleFAQ = useCallback((index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  return (
    <div className="faq-outer">

      <div className="faq-search">
        <input type="text" className="faq-search-input" value={searchInput} onChange={handleSearchInputChange} placeholder="Search your question" />
      </div>
      <div className="faq-list">
        {filteredFAQs.length === 0 ? (
          <div className="no-results">
            <p>No results found for "{searchInput}".</p>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
              isLastItem={index === filteredFAQs.length - 1}
              onClick={() => toggleFAQ(index)}
            />
        )))
      }
      </div>

    </div>
  );
};

export default FaqQuestions;
