import React from "react";
import "./BookDashboardNavbar.css";
import { PaidIcon } from "../assets"

function BookDashboardNavbar({ currentSection, handleSectionChange }) {
  const tabs = [
    "Syllabus",
    "Q&A",
    "Notes",
    "Insights",
    "Roadmap",
  ];
  return (
    <nav className="book-dashboard-nav-bar">
      <ul>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleSectionChange(tab)}
            className={tab === currentSection ? "bookdashboard-active-tab tab-item" : "tab-item"}
          >
            {tab}
            {(tab === "Notes" || tab === "Insights") && (
              <span className="paid-icon">
                <img src={PaidIcon} alt="Paid Icon" />
              </span>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
}

export default BookDashboardNavbar;
