import React from "react";
import "./BookDashboard.css";
import { useState } from "react";
import BookDashboardProgressBar from "./BookDashboardProgressBar";
import BookDashboardInsightAnalyticsMidSec from "./BookDashboardInsightAnalyticsMidSec";
import BookDashboardUnitMidSec from "./BookDashboardUnitMidSec";
import BookDashboardLeftSec from "./BookDashboardLeftSec";
import BookDashboardRightSec from "./BookDashboardRightSec";
import BookDashboardSyllabus from "./BookDashboardSyllabus";
import BookDashboardMap from "./BookDashboardMap";
import BookDashboardMidSec from "./BookDashboardMidSec";
import BookDashboardUnitEmptyRightSec from "./BookDashboardUnitEmptyRightSec";
import PlanPopUp from "./PlanPopUp";
import BookDashboardRoadmapRight from "./BookDashboardRoadmapRight";
import { useBookDashboard } from "../context/book-dashboard-context";
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
    rightComponent: false,
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
  const { subCode } = useBookDashboard();

  // Get course data from sessionStorage
  const getCurrentCourse = () => {
    const allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
    return allCourses.find(course => course.courseCodes.includes(subCode));
  };

  const handleSectionChange = (section) => {
    if (section === "Insights") {
      setShowPlanPopUp(true);
    } else {
      setCurrentSection(section);
    }
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
          <BookDashboardLeftSec />

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
                />
                <RightComponent />
              </React.Fragment>
            );
          })}
        </div>

        {/* === MOBILE LAYOUT === */}
        <div className="mobile-layout">
          <div className="left-right-wrapper">
            <BookDashboardLeftSec />
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
        />
      )}
    </div>
  );
}

export default BookDashboard;
