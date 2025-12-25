import React from "react";
import "./BookDashboardNavbar.css";
import { Crown, BookOpen, MessageCircleQuestion, FileText, BarChart3, Map } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useBookDashboard } from "../context/book-dashboard-context";
import { findCourseByCode } from "../utils/courseUtils";

function BookDashboardNavbar({ currentSection, handleSectionChange }) {
  const { checkFeatureAccess, checkLifetimeLimit, getUserPlanForCourse } = useCart();
  const { subCode, selectedUnit } = useBookDashboard();
  
  const tabs = [
    { name: "Syllabus", icon: BookOpen },
    { name: "Q&A", icon: MessageCircleQuestion }, 
    { name: "Notes", icon: FileText },
    { name: "Insights", icon: BarChart3 },
    { name: "Roadmap", icon: Map },
  ];

  // Get current course to check plan access
  const getCurrentCourse = () => findCourseByCode(subCode);

  const shouldShowCrownIcon = (tabName) => {
    const currentCourse = getCurrentCourse();
    
    if (!currentCourse) {
      return false;
    }
    
    const unitNumber = parseInt(selectedUnit);
    const userPlan = getUserPlanForCourse(currentCourse.id);
    
    // Check lifetime limits for Summariser and Rephraser
    if (tabName === 'Summariser' || tabName === 'Rephraser') {
      const withinLifetimeLimit = checkLifetimeLimit(tabName);
      if (!withinLifetimeLimit) {
        return true; // Show crown if lifetime limit exceeded
      }
    }
    
    // Check access
    const hasAccess = checkFeatureAccess(currentCourse.id, tabName, unitNumber);
    
    // Show crown when access is denied
    return hasAccess === false || hasAccess === 'limited';
  };

  return (
    <nav className="book-dashboard-nav-bar">
      <ul>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <div
              key={tab.name}
              onClick={() => handleSectionChange(tab.name)}
              className={tab.name === currentSection ? "bookdashboard-active-tab tab-item" : "tab-item group"}
            >
              <IconComponent size={16} className="tab-icon" />
              <span className="tab-text">{tab.name}</span>
              {shouldShowCrownIcon(tab.name) && (
                <span className="paid-icon">
                  <Crown size={16} fill="#FFD700"  className={tab.name === currentSection ? "text-[#FFD700]" : "group-hover:text-[#FFD700]"} />
                </span>
              )}
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default BookDashboardNavbar;
