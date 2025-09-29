import React, { useEffect } from "react";
import "./BookDashboardRightSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";

function BookDashboardNotesRightSec() {
  const { 
    unitNotesLoading, 
    notesTopics, 
    selectedUnit, 
    selectedTopic, 
    setSelectedTopic 
  } = useBookDashboard();

  // Get topics for current unit
  const currentUnitTopics = notesTopics[selectedUnit] || [];

  useEffect(() => {
    if (!unitNotesLoading && currentUnitTopics.length > 0 && selectedTopic === 0) {
      setSelectedTopic(0);
    }
  }, [unitNotesLoading, currentUnitTopics, selectedTopic, setSelectedTopic]);

  return (
    <div className="book-dashboard-right-sec">
      {/** Desktop View */}
      <div className="topics-not-dropdown">
        <div className="book-dashboard-topics">
          {!unitNotesLoading && (
            <>
              <div className="all-topics">All Topics</div>
              <ol>
                {currentUnitTopics.map((topic, index) => (
                  <li 
                    className={selectedTopic === index ? "selected-question" : ""}
                    key={index}
                    onClick={() => setSelectedTopic(index)}
                  >
                    {index + 1}. {topic.name}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>

      {/** Mobile View */}
      <div className="mobile-question-dropdown">
        {!unitNotesLoading && currentUnitTopics.length > 0 && (
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(Number(e.target.value))}
          >
            {currentUnitTopics.map((topic, index) => (
              <option key={index} value={index}>
                Topic {index + 1}: {topic.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default BookDashboardNotesRightSec;
