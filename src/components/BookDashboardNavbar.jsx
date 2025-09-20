import React from "react";
import "./BookDashboardNavbar.css";

function BookDashboardNavbar({ currentSection, handleSectionChange }) {
  const tabs = [
    "Syllabus",
    "Q&A",
    "Notes",
    "Insights", 
    "Road-Map", 
    // "Custom Preparation", 
    // "AiFeatured"
  ];
  return (
    <nav className="book-dashboard-nav-bar">
      <ul>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleSectionChange(tab)}
            className={tab === currentSection ? "bookdashboard-active-tab" : ""}
          >
            {tab}
          </div>
        ))}
      </ul>
    </nav>
  );
}

export default BookDashboardNavbar;
