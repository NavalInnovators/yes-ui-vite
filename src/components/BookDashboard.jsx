import React from "react";
import "./BookDashboard.css";
import { useState } from "react";
import BookDashboardProgressBar from "./BookDashboardProgressBar";
import BookDashboardInsightAnalyticsMidSec from "./BookDashboardInsightAnalyticsMidSec";
import BookDashboardUnitMidSec from "./BookDashboardUnitMidSec";
import BookDashboardLeftSec from "./BookDashboardLeftSec";
import BookDashboardRightSec from "./BookDashboardRightSec";
import BookDashboardSyllabus from "./BookDashboardSyllabus";
// import BookDashboardAiFeature from "./BookDashboardAiFeature";
// import BookDashboardMap from "./BookDashboardMap";
import BookDashboardMidSec from "./BookDashboardMidSec";
import BookDashboardUnitEmptyRightSec from "./BookDashboardUnitEmptyRightSec";
import PlanPopup from "../components/PlanPopUp.jsx";

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
    title: "Unit",
    component: BookDashboardUnitMidSec,
    rightComponent: false,
  },
  {
    title: "Insights",
    component: BookDashboardInsightAnalyticsMidSec,
    rightComponent: false,
  },
  // {
  //   title: "Maps",
  //   component: BookDashboardMap,
  //   rightComponent: false,
  // },
  // {
  //   title: "Custom Preparation",
  //   component: BookDashboardMap,
  //   rightComponent: false,
  // },
  // {
  //   title: "AiFeatured",
  //   component: BookDashboardAiFeature,
  //   rightComponent: false,
  // },
];

function BookDashboard() {
  const [currentSection, setCurrentSection] = useState("Syllabus");
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  
  const handleSectionChange = (section) => {
    if (section === "Unit" || section === "Insights") {
      setShowPlanPopup(true);
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
            const RightComponent = section.rightComponent
              ? BookDashboardRightSec
              : BookDashboardUnitEmptyRightSec;
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
              const RightComponent = section.rightComponent
                ? BookDashboardRightSec
                : BookDashboardUnitEmptyRightSec;
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
      {showPlanPopup && (
        <PlanPopup onClose={() => setShowPlanPopup(false)} />
      )}
    </div>
  );
}

export default BookDashboard;
