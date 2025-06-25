import React from "react";
import BookDashboardNavbar from "./BookDashboardNavbar";
import "./BookDashboardUnitMidSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import parse from "html-react-parser";

function BookDashboardUnitMidSec({ currentSection, handleSectionChange }) {
  const { selectedUnit, notesList, unitNotesLoading, unitNotesError } = useBookDashboard();
  // if (unitNotesLoading) {
  //   return <div>Loading unit notes...</div>;
  // }
  // if (unitNotesError) {
  //   return (
  //     <div>
  //       Error loading unit notes: Please log in or check if the subject code in URL is valid. {unitNotesError.message}
  //     </div>
  //   );
  // }
  const unitNotesContent = notesList?.[selectedUnit];
  return (
    <div className="parent-book-dashboard-unit">
      <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />

      <div className="dropdown-cont">
        {/* to be commented out until filtering logic applied */}
        {/* <select name="" className="book-dashboard-dropdown common-css-dropdown">
          <option value="none">None</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
          <option value="option1">Most Repeated</option>
          <option value="option2">Least Repeated</option>
        </select> */}
      </div>
      {unitNotesLoading
        ? (<div>Loading unit notes...</div>)
        : unitNotesError
          ? (<div>Error loading unit notes. Please contact support team or raise a query!</div>)
          : unitNotesContent
            ? (<div className="book-dashboard-question-summary-container">
              <div className="book-dashboard-question">
                Chapter Topic: Summary
              </div>
              {/* </div> */}
              <div className="book-dashboard-answer">
                {parse(unitNotesContent)}
              </div>
            </div>)
            : (<div>Data will be available soon!</div>)}
    </div>
  );
}

export default BookDashboardUnitMidSec;
