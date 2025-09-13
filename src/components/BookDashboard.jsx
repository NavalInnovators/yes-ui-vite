import React, { useState, useEffect } from "react";
import "./BookDashboard.css";
import BookDashboardProgressBar from "./BookDashboardProgressBar";
import BookDashboardInsightAnalyticsMidSec from "./BookDashboardInsightAnalyticsMidSec";
import BookDashboardUnitMidSec from "./BookDashboardUnitMidSec";
import BookDashboardLeftSec from "./BookDashboardLeftSec";
import BookDashboardRightSec from "./BookDashboardRightSec";
import BookDashboardSyllabus from "./BookDashboardSyllabus";
import BookDashboardMidSec from "./BookDashboardMidSec";
import BookDashboardUnitEmptyRightSec from "./BookDashboardUnitEmptyRightSec";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const BookDashboardSections = [
  {
    title: "Syllabus",
    component: BookDashboardSyllabus,
    rightComponent: false,
  },
  { title: "Q&A", component: BookDashboardMidSec, rightComponent: true },
  { title: "Unit", component: BookDashboardUnitMidSec, rightComponent: false },
  {
    title: "Insights",
    component: BookDashboardInsightAnalyticsMidSec,
    rightComponent: false,
  },
];

function BookDashboard() {
  const [currentSection, setCurrentSection] = useState("Syllabus");

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const DashboardtourSteps_Desktop = [
    {
      popover: {
        title: "Welcome",
        description:
          "Welcome to YES Dashboard in 2 minutes,we'll walk you through Syllabus,Q&A,Notes and insights so you know how to use everything effectively!!",
      },
    },
    {
      element: ".book-details",
      popover: {
        title: "Filters",
        description:
          "Choose your branch and year here. This makes sure the syllabus, questions, and insights match your course.",
      },
    },
    {
      element: ".book-dashboard-unit-bar",
      popover: {
        title: "Unit Sidebar",
        description:
          "Pick any unit here. The selected unit controls what appears in Syllabus, Q&A, Notes, and Insights.",
      },
    },
    {
      element: ".book-dashboard-nav-bar",
      popover: {
        title: "Tabs ",
        description:
          "These tabs are the core sections: Syllabus (default), Q&A (with past questions), Unit Notes, and Insights (analysis).",
      },
    },
    {
      element: ".syllabus-content",
      popover: {
        title: "Syllabus Section",
        description:
          "Here’s the syllabus for the chosen unit. Switch units on the left to see different content.",
      },
    },
    {
      element: "#qa",
      popover: {
        title: "Q&A Tab",
        description:
          "Click here to study previous-year questions and their answers with extra tools.",
      },
      disableActiveInteraction: true,
    },
    {
      element: "#qa",
      popover: { title: "Click on this tab to continue.." },
    },
    {
      element: ".pagination-container",
      popover: {
        title: "Question Navigation ",
        description: "Navigate questions using arrows or page numbers.",
      },
    },
    {
      element: ".rendered-content span p",
      popover: {
        title: "Answer Card",
        description:
          "This area shows the full detailed answer. Scroll down to read everything.",
      },
      disableActiveInteraction: true,
    },
    {
      element: "#questions ol li",
      popover: {
        title: "All Questions List",
        description:
          "Quickly jump to any question from here instead of scrolling one by one",
      },
    },
    // {
    //   popover: { title: "Scrolling to the top to continue the tour" },
    //   onDeselected: () => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //   },
    // },
    {
      element: ".summarizer-btn",
      popover: {
        title: " Summarizer Button",
        description:
          "Click Summarizer to get a short version of the answer. It will appear below the main answer.",
      },
      onHighlightStarted: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      element: ".rephraser-select",
      popover: {
        title: "Rephraser Dropdown",
        description:
          "Use Rephraser to get the same answer in different styles (simpler, professional, or bullet points). It appears below the summary.",
      },
    },
    {
      element: "#Unit",
      popover: {
        title: "Unit tab",
        description: "This section gives you concise notes for quick revision",
      },
      disableActiveInteraction: true,
    },
    {
      element: "#Unit",
      popover: { title: "Click on this tab to continue.." },
    },
    {
      element: ".rephraser",
      popover: {
        title: "Notes Area",
        description:
          "Here are short notes for the selected unit. Perfect for last-minute prep.",
      },
    },
    {
      element: "#Insights",
      popover: {
        title: "Insights tab",
        description: "See detailed analysis of previous-year papers here.",
      },
      disableActiveInteraction: true,
    },
    {
      element: "#Insights",
      popover: { title: "Click on this tab to continue.." },
    },
    {
      element: "#bar",
      popover: {
        title: "Bar Graph",
        description:
          "This graph shows how often each topic is repeated. Focus on high-percentage topics",
      },
    },
    {
      element: "#pie",
      popover: {
        title: "Pie Chart",
        description:
          "This shows what types of questions (short, long, MCQ etc.) usually come from this unit.",
      },
    },
    {
      element: "#insightable",
      popover: {
        title: " Insights Table",
        description:
          "This table shows which topics get which type of questions – very useful for targeted preparation.",
      },
    },
    {
      popover: {
        title: "Finish",
        description:
          "You’re ready to use YES! Switch units, study with Q&A, revise with Notes, and plan smartly with Insights. Good luck with your exams ✅",
      },
    },
  ];
  // const DashboardtourSteps_Mobile = [
  //   {
  //     popover: {
  //       title: "Welcome",
  //       description:
  //         "Welcome to YES Dashboard in 2 minutes,we'll walk you through Syllabus,Q&A,Notes and insights so you know how to use everything effectively!!",
  //     },
  //   },
  //   {
  //     element: ".book-details",
  //     popover: {
  //       title: "Filters",
  //       description:
  //         "Choose your branch and year here. This makes sure the syllabus, questions, and insights match your course.",
  //     },
  //     stagePadding: 0,
  //   },
  //   {
  //     element: "#mobile-unit-select",
  //     popover: {
  //       title: "Unit Dropdown",
  //       description:
  //         "Pick any unit here. The selected unit controls what appears in Syllabus, Q&A, Notes, and Insights.",
  //     },
  //     stagePadding: 6,
  //   },
  //   {
  //     element: ".book-dashboard-nav-bar",
  //     popover: {
  //       title: "Tabs ",
  //       description:
  //         "These tabs are the core sections: Syllabus (default), Q&A (with past questions), Unit Notes, and Insights (analysis).",
  //     },
  //   },
  // ];
  useEffect(() => {
    // const isMobile = window.matchMedia("(max-width:1023px)").matches;
    const tourDriver = driver({
      showProgress: true,
      allowClose: true,
      smoothScroll: true,
      overlayClickBehavior: "nextStep",
      steps: DashboardtourSteps_Desktop,
    });
    const timer = setTimeout(() => {
      tourDriver.drive();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    </div>
  );
}

export default BookDashboard;
