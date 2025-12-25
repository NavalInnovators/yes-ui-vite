import React, { useState } from "react";
import "./BookDashboardLeftSec.css";
import { Crown } from "lucide-react";
import { useBookDashboard } from "../context/book-dashboard-context";
import { useCart } from "../context/CartContext";
import { findCourseByCode } from "../utils/courseUtils";

const units = [
  {
    name: "Unit 1",
    num: "1",
  },
  {
    name: "Unit 2",
    num: "2",
  },
  {
    name: "Unit 3",
    num: "3",
  },
  {
    name: "Unit 4",
    num: "4",
  },
  {
    name: "Unit 5",
    num: "5",
  },
];

function BookDashboardLeftSec({ currentSection, onUnitAccessDenied }) {
  const { selectedUnit, setSelectedUnit, subCode } = useBookDashboard(); // Adjust to match your context keys.
  const { checkFeatureAccess, getRequiredPlanForFeature, getUserPlanForCourse } = useCart();
  
  // State for popup - moved to parent component
  // const [showPlanPopUp, setShowPlanPopUp] = useState(false);
  // const [requiredPlan, setRequiredPlan] = useState(null);
  // const [targetUnit, setTargetUnit] = useState(null);

  // Get current course to check plan
  const getCurrentCourse = () => findCourseByCode(subCode);

  const shouldShowUnitCrownIcon = (unitNum) => {
    const currentCourse = getCurrentCourse();
    if (!currentCourse) return false;
    
    const unitNumber = parseInt(unitNum);
    const userPlan = getUserPlanForCourse(currentCourse.id);
    
    const restrictedSections = ['Notes', 'Insights'];
    if (restrictedSections.includes(currentSection)) {
      const isFreeUser = userPlan === "Free" || userPlan === "FREE" || !userPlan;
      return isFreeUser && unitNumber > 1;
    }
    
    return false;
  };

  // Handle unit change with access check
  const handleUnitChange = (unitNum) => {
    const currentCourse = getCurrentCourse();
    if (!currentCourse) {
      setSelectedUnit(unitNum);
      return;
    }

    // Check if current section requires access control
    const restrictedSections = ['Notes', 'Insights'];
    if (restrictedSections.includes(currentSection)) {
      const courseId = currentCourse.id;
      const unitNumber = parseInt(unitNum);
      const hasAccess = checkFeatureAccess(courseId, currentSection, unitNumber);
      
      if (hasAccess === false) {
        // User doesn't have access to this unit - trigger popup in parent
        const requiredPlan = getRequiredPlanForFeature(currentSection);
        onUnitAccessDenied(requiredPlan, unitNumber);
        return;
      }
    }
    
    // If access is allowed or section doesn't require restrictions, change unit
    setSelectedUnit(unitNum);
  };

  //Ensure Unit 1 is selected by default
  React.useEffect(() => {
    if (!selectedUnit) {
      setSelectedUnit("1");
    }
  }, [selectedUnit, setSelectedUnit]);

  // Get current course for popup - moved to parent component
  // const getCurrentCourseForPopup = () => {
  //   const allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
  //   return allCourses.find(course => course.courseCodes.includes(subCode));
  // };

  return (
    <div className="book-dashboard-left-sec">
      {/* Desktop sidebar */}
      <nav className="book-dashboard-unit-bar">
        <ul>
          {units.map((u) => (
            <li
              key={u.name}
              onClick={() => handleUnitChange(u.num)}
              className={`${u.num === selectedUnit ? "active-unit" : ""} unit-item`}
            >
              <span className="unit-text">{u.name}</span>
              {shouldShowUnitCrownIcon(u.num) && (
                <span className="unit-crown-icon">
                   <Crown size={16} fill="#FFD700" color="#141414" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Dropdown */}
      <div className="mobile-unit-dropdown">
        <select 
        value={selectedUnit}
        onChange={(e) => handleUnitChange(e.target.value)}
        >
          {units.map((u) => (
            <option key={u.num} value={u.num}>
              {u.name} {shouldShowUnitCrownIcon(u.num) ? '👑' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BookDashboardLeftSec;
