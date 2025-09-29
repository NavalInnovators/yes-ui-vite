import React from "react";
import "./BookDashboard.css";
import { useState, useEffect } from "react";
import BookDashboardProgressBar from "./BookDashboardProgressBar";
import BookDashboardInsightAnalyticsMidSec from "./BookDashboardInsightAnalyticsMidSec";
import BookDashboardUnitMidSec from "./BookDashboardUnitMidSec";
import BookDashboardLeftSec from "./BookDashboardLeftSec";
import BookDashboardRightSec from "./BookDashboardRightSec";
import BookDashboardNotesRightSec from "./BookDashboardNotesRightSec";
import BookDashboardSyllabus from "./BookDashboardSyllabus";
import BookDashboardMap from "./BookDashboardMap";
import BookDashboardMidSec from "./BookDashboardMidSec";
import BookDashboardUnitEmptyRightSec from "./BookDashboardUnitEmptyRightSec";
import PlanPopUp from "./PlanPopUp";
import BookDashboardRoadmapRight from "./BookDashboardRoadmapRight";
import { useBookDashboard } from "../context/book-dashboard-context";
import { useCart } from "../context/CartContext";
import { useSearchParams, useLocation } from "react-router-dom";
const BookDashboardSections = [
  {
    title: "Syllabus",
    component: BookDashboardSyllabus,
    rightComponent: false,
  },
  {
    title: "Q&A",
    component: BookDashboardMidSec,
    rightComponent: true,
  },
  {
    title: "Notes",
    component: BookDashboardUnitMidSec,
    rightComponent: BookDashboardNotesRightSec,
  },
  {
    title: "Insights",
    component: BookDashboardInsightAnalyticsMidSec,
    rightComponent: false,
  },
  {
    title: "Roadmap",
    component: BookDashboardMap,
    rightComponent: BookDashboardRoadmapRight,
  },
];

function BookDashboard() {
  const [currentSection, setCurrentSection] = useState("Syllabus");
  const [showPlanPopUp, setShowPlanPopUp] = useState(false);
  const [requiredPlan, setRequiredPlan] = useState(null);
  const [targetUnit, setTargetUnit] = useState(null);
  const { subCode, selectedUnit, setSelectedQnATopic, setSelectedTopic } = useBookDashboard();
  const { checkFeatureAccess, getRequiredPlanForFeature, getUserPlanForCourse, checkLifetimeLimit } = useCart();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Get course data from sessionStorage
  const getCurrentCourse = () => {
    const allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
    return allCourses.find(course => course.courseCodes.includes(subCode));
  };

  // Handle URL parameters for section and topic filtering
  useEffect(() => {
    const qna = searchParams.get('qna');
    const notes = searchParams.get('notes');
    
    if (qna === '1') {
      setCurrentSection('Q&A');
    } else if (notes === '1') {
      setCurrentSection('Notes');
    }
    
    // Handle topic filtering from roadmap navigation
    if (location.state?.filterByTopic && location.state?.topicName) {
      if (qna === '1') {
        setSelectedQnATopic(location.state.topicName);
      } else if (notes === '1') {
        // For Notes, we need to find the topic index in the current unit
        // This will be handled in the Notes component
        const topicName = location.state.topicName;
        // We'll set this in the context for the Notes component to use
        sessionStorage.setItem('filterByTopic', topicName);
      }
    }
  }, [searchParams, location.state, setSelectedQnATopic]);

  const handleSectionChange = (section) => {
    const currentCourse = getCurrentCourse();
    if (!currentCourse) {
      setCurrentSection(section);
      return;
    }

    const courseId = currentCourse.id;
    const unitNumber = parseInt(selectedUnit);
    
    // Check unit-wise access for Notes and Insights
    const hasAccess = checkFeatureAccess(courseId, section, unitNumber);
    
    // Check lifetime limits for Summariser and Rephraser
    if (section === 'Summariser' || section === 'Rephraser') {
      const withinLifetimeLimit = checkLifetimeLimit(section);
      if (!withinLifetimeLimit) {
        const requiredPlan = getRequiredPlanForFeature(section);
        setRequiredPlan(requiredPlan);
        setShowPlanPopUp(true);
        return;
      }
    }
    
    if (hasAccess === false) {
      // User doesn't have access
      const requiredPlan = getRequiredPlanForFeature(section);
      setRequiredPlan(requiredPlan);
      setShowPlanPopUp(true);
    } else if (hasAccess === 'limited') {
      // User has limited access (e.g., Free user accessing Unit 1 Notes/Insights)
      setCurrentSection(section);
    } else {
      // User has full access
      setCurrentSection(section);
    }
  };

  // Handle unit access denied from left sidebar
  const handleUnitAccessDenied = (requiredPlan, unitNumber) => {
    setRequiredPlan(requiredPlan);
    setTargetUnit(unitNumber);
    setShowPlanPopUp(true);
  };

  // const handleSectionChange = (section) => {
  //   setCurrentSection(section);
  // };

  return (
    <div className="parent-book-dashboard">
      <BookDashboardProgressBar />

      <div className="book-dashboard-content-sec">
        {/* === DESKTOP LAYOUT === */}
        <div className="desktop-layout">
          <BookDashboardLeftSec currentSection={currentSection} onUnitAccessDenied={handleUnitAccessDenied} />

          {BookDashboardSections.filter(
            (section) => section.title === currentSection
          ).map((section, index) => {
            const Component = section.component;
            const RightComponent =
              typeof section.rightComponent === "boolean"
                ? section.rightComponent
                  ? BookDashboardRightSec
                  : BookDashboardUnitEmptyRightSec
                : section.rightComponent;

            return (
              <React.Fragment key={index}>
                <Component
                  currentSection={currentSection}
                  handleSectionChange={handleSectionChange}
                  selectedUnitId={parseInt(selectedUnit)}
                />
                <RightComponent />
              </React.Fragment>
            );
          })}
        </div>

        {/* === MOBILE LAYOUT === */}
        <div className="mobile-layout">
          <div className="left-right-wrapper">
            <BookDashboardLeftSec currentSection={currentSection} onUnitAccessDenied={handleUnitAccessDenied} />
            {BookDashboardSections.filter(
              (section) => section.title === currentSection
            ).map((section, index) => {
              const RightComponent =
                typeof section.rightComponent === "boolean"
                  ? section.rightComponent
                    ? BookDashboardRightSec
                    : BookDashboardUnitEmptyRightSec
                  : section.rightComponent;

              return <RightComponent key={"right-" + index} />;
            })}
          </div>

          <div className="mid-wrapper">
            {BookDashboardSections.filter(
              (section) => section.title === currentSection
            ).map((section, index) => {
              const Component = section.component;
              return (
                <Component
                  key={"mid-" + index}
                  currentSection={currentSection}
                  handleSectionChange={handleSectionChange}
                  selectedUnitId={parseInt(selectedUnit)}
                />
              );
            })}
          </div>
        </div>
      </div>




      {/* <div className="book-dashboard-content-sec">
        <BookDashboardLeftSec />
        {BookDashboardSections.filter(
          (section) => section.title === currentSection
        ).map((section, index) => {
          const Component = section.component;
          return (
            <>
              <Component
                key={index}
                currentSection={currentSection}
                handleSectionChange={handleSectionChange}
              />
              {section.rightComponent ? (
                <BookDashboardRightSec />
              ) : (
                <BookDashboardUnitEmptyRightSec />
              )}
            </>
          );
        })}
      </div> */}
      {/* ✅ Popup rendered conditionally */}
      {showPlanPopUp && (
        <PlanPopUp 
          onClose={() => setShowPlanPopUp(false)} 
          course={getCurrentCourse()}
          requiredPlan={requiredPlan}
          currentPlan={getCurrentCourse() ? getUserPlanForCourse(getCurrentCourse().id) : 'Free'}
          targetUnit={targetUnit}
        />
      )}
    </div>
  );
}

export default BookDashboard;
