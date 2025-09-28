import React from "react";
import "./BookDashboardNavbar.css";
import { PaidIcon } from "../assets"
import { useCart } from "../context/CartContext";
import { useBookDashboard } from "../context/book-dashboard-context";

function BookDashboardNavbar({ currentSection, handleSectionChange }) {
  const { checkFeatureAccess, checkLifetimeLimit } = useCart();
  const { subCode, selectedUnit } = useBookDashboard();
  
  const tabs = [
    "Syllabus",
    "Q&A", 
    "Notes",
    "Insights",
    "Roadmap",
  ];

  // Get current course to check plan access
  const getCurrentCourse = () => {
    const allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
    return allCourses.find(course => course.courseCodes.includes(subCode));
  };

  const shouldShowCrownIcon = (tab) => {
    const currentCourse = getCurrentCourse();
    if (!currentCourse) return false;
    
    const unitNumber = parseInt(selectedUnit);
    const hasAccess = checkFeatureAccess(currentCourse.id, tab, unitNumber);
    
    // Check lifetime limits for Summariser and Rephraser
    if (tab === 'Summariser' || tab === 'Rephraser') {
      const withinLifetimeLimit = checkLifetimeLimit(tab);
      if (!withinLifetimeLimit) {
        return true; // Show crown if lifetime limit exceeded
      }
    }
    
    return hasAccess === false || hasAccess === 'limited';
  };

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
            {shouldShowCrownIcon(tab) && (
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
