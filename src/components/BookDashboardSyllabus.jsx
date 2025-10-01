import React from "react";
// import BookDashboardResponsiveUnitDropdown from "./BookDashboardResponsiveUnitDropdown";
// import BookDashboardResponsiveTopicsDropdown from "./BookDashboardResponsiveTopicsDropdown";
// import LeftPageArrow from "../assets/LeftPageArrow.svg";
import RightPageArrow from "../assets/RightPageArrow.svg";
import BookDashboardNavbar from "./BookDashboardNavbar";
import "./BookDashboardSyllabus.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import { LoadingState, ErrorState, DataUnavailableState, LoadingState404, Error404State } from "./LoadingStates";

export default function BookDashboardSyllabus({ currentSection, handleSectionChange }) {
  const { selectedUnit, syllabusLoading, syllabusError, syllabus } =
    useBookDashboard();

  // Show loading state while syllabus is being fetched
  if (syllabusLoading) {
    return (
      <div className="bookdashboard-syllabus-mid-section">
        <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />
        <div className="book-dashboard-syllabus-sec">
          <LoadingState404 message="Loading syllabus content..." size="large" />
        </div>
      </div>
    );
  }

  // Show error state if syllabus failed to load
  if (syllabusError) {
    return (
      <div className="bookdashboard-syllabus-mid-section">
        <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />
        <div className="book-dashboard-syllabus-sec">
          <Error404State message="Failed to load syllabus. Please try again later." size="large" />
        </div>
      </div>
    );
  }

  const syllabusContent = syllabus?.units[selectedUnit - 1]?.topics || [];

  return (
    <div className="bookdashboard-syllabus-mid-section">
      <div className="book-dashboard-syllabus-container">
        <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />
        <div className="book-dashboard-syllabus-sec">
          <div className="syllabus-title">{syllabus.units[selectedUnit - 1].unitTitle}</div>
          <div className="book-dashboard-syllabus-sec-container">
            <div className="syllabus-content">
              {syllabusContent.length === 0 ? (
                <DataUnavailableState message="No topics available for this unit yet." size="small" />
              ) : (
                syllabusContent.map((content, index) => (
                  <div
                    className="syllabus"
                    style={{
                      borderBottom:
                        index === syllabusContent.length - 1 && "none",
                    }}
                    key={index}
                  >
                    {content}
                  </div>
                ))
              )}
            </div>
            {/* The below commented section could be used to display syllabus in table format */}
            {/* <div className="syllabus-table-container">
              {syllabus.map((row, i) => (
                <div className="syllabus-table-row" key={i}>
                  {row.map((cell, j) => (
                    <div className="syllabus-table-cell" style={{ fontWeight: i === 0 && "bold" }} key={j}>{cell}</div>
                  ))}
                </div>
              ))}
            </div> */}
          </div>


        </div>
      </div>
    </div >
  );
}
