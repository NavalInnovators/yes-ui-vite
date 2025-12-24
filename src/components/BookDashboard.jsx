import React from "react";
import "./BookDashboard.css";
import { useState, useEffect, useRef } from "react";
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
import {
  trackBookDashboardActivity,
  trackQnAStudied,
  trackNotesStudied,
  getISTISOString,
} from "../utils/analytics";
import { getCourseTrackingMeta } from "../utils/courseUtils";
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
  const { subCode, selectedUnit, setSelectedQnATopic, setSelectedTopic } =
    useBookDashboard();
  const {
    checkFeatureAccess,
    getRequiredPlanForFeature,
    getUserPlanForCourse,
    checkLifetimeLimit,
    reloadSubscriptions,
  } = useCart();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Track study session timing and previous section
  const studySessionRef = useRef(null);
  const previousSectionRef = useRef(null);

  // Track Q&A and Notes engagement
  const qnaEngagementRef = useRef({ questions: [], startTimes: {} });
  const notesEngagementRef = useRef({ topics: [], startTimes: {} });

  const getCurrentCourse = () => {
    const { course } = getCourseTrackingMeta(subCode);
    return course;
  };

  useEffect(() => {
    if (subCode) {
      sessionStorage.setItem("courseCode", subCode.toUpperCase());
    }
  }, [subCode]);

  // Reload subscriptions when component mounts
  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        await reloadSubscriptions();
        console.log("Subscriptions reloaded for book dashboard");
      } catch (error) {
        console.error("Failed to reload subscriptions:", error);
      }
    };

    // Only reload if user is logged in
    const profileId = localStorage.getItem("profileId");
    if (profileId) {
      loadSubscriptions();
    }
  }, []);

  // Handle URL parameters for section and topic filtering
  useEffect(() => {
    const qna = searchParams.get("qna");
    const notes = searchParams.get("notes");

    if (qna === "1") {
      setCurrentSection("Q&A");
    } else if (notes === "1") {
      setCurrentSection("Notes");
    }

    // Handle topic filtering from roadmap navigation
    if (location.state?.filterByTopic && location.state?.topicName) {
      if (qna === "1") {
        setSelectedQnATopic(location.state.topicName);
      } else if (notes === "1") {
        // For Notes, we need to find the topic index in the current unit
        // This will be handled in the Notes component
        const topicName = location.state.topicName;
        // We'll set this in the context for the Notes component to use
        sessionStorage.setItem("filterByTopic", topicName);
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
    if (section === "Summariser" || section === "Rephraser") {
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
    } else if (hasAccess === "limited") {
      // User has limited access (e.g., Free user accessing Unit 1 Notes/Insights)
      setCurrentSection(section);
    } else {
      // User has full access
      setCurrentSection(section);
    }
  };

  useEffect(() => {
    if (!subCode) {
      return;
    }

    const { courseId, courseName, subjectCode } =
      getCourseTrackingMeta(subCode);
    const unitNumber = parseInt(selectedUnit, 10) || null;
    const startTime = Date.now();

    // Track previous session when switching sections (not units)
    if (studySessionRef.current) {
      const previousSession = studySessionRef.current;

      // Only track if switching to a different section
      if (previousSession.section !== currentSection) {
        const durationMs = Date.now() - previousSession.startTime;

        // Track with unified event (action determined by duration)
        const eventId = trackBookDashboardActivity({
          courseId: previousSession.courseId,
          courseName: previousSession.courseName,
          subjectCode: previousSession.subjectCode,
          section: previousSession.section,
          fromSection: previousSession.fromSection,
          durationMs,
          unitsVisited: previousSession.unitsVisited,
          timestamp: getISTISOString(),
        });

        // Track section-specific engagement if applicable
        if (
          previousSession.section === "Q&A" &&
          qnaEngagementRef.current.questions.length > 0
        ) {
          trackQnAStudied({
            parentEventId: eventId,
            courseId: previousSession.courseId,
            questionsStudied: qnaEngagementRef.current.questions,
            timestamp: getISTISOString(),
          });
          // Reset Q&A tracking
          qnaEngagementRef.current = {
            questions: [],
            startTimes: {},
          };
        }

        if (
          previousSession.section === "Notes" &&
          notesEngagementRef.current.topics.length > 0
        ) {
          trackNotesStudied({
            parentEventId: eventId,
            courseId: previousSession.courseId,
            topicsStudied: notesEngagementRef.current.topics,
            timestamp: getISTISOString(),
          });
          // Reset Notes tracking
          notesEngagementRef.current = { topics: [], startTimes: {} };
        }
      }
    }

    // Initialize or update session info
    if (
      !studySessionRef.current ||
      studySessionRef.current.section !== currentSection
    ) {
      // New section - create new session
      studySessionRef.current = {
        courseId,
        courseName,
        subjectCode,
        section: currentSection,
        fromSection: previousSectionRef.current,
        startTime,
        unitsVisited: unitNumber ? [unitNumber] : [],
      };
      previousSectionRef.current = currentSection;
    } else {
      // Same section, different unit - add to units visited
      if (
        unitNumber &&
        !studySessionRef.current.unitsVisited.includes(unitNumber)
      ) {
        studySessionRef.current.unitsVisited.push(unitNumber);
      }
    }

    return () => {
      // Cleanup is handled by the next effect or component unmount
    };
  }, [currentSection, selectedUnit, subCode]);

  // Track activity when component unmounts (user leaves book dashboard)
  useEffect(() => {
    return () => {
      if (studySessionRef.current) {
        const session = studySessionRef.current;
        const durationMs = Date.now() - session.startTime;

        // Track with unified event (action determined by duration)
        const eventId = trackBookDashboardActivity({
          courseId: session.courseId,
          courseName: session.courseName,
          subjectCode: session.subjectCode,
          section: session.section,
          fromSection: session.fromSection,
          durationMs,
          unitsVisited: session.unitsVisited,
          timestamp: getISTISOString(),
        });

        // Track section-specific engagement if applicable
        if (
          session.section === "Q&A" &&
          qnaEngagementRef.current.questions.length > 0
        ) {
          trackQnAStudied({
            parentEventId: eventId,
            courseId: session.courseId,
            questionsStudied: qnaEngagementRef.current.questions,
            timestamp: getISTISOString(),
          });
        }

        if (
          session.section === "Notes" &&
          notesEngagementRef.current.topics.length > 0
        ) {
          trackNotesStudied({
            parentEventId: eventId,
            courseId: session.courseId,
            topicsStudied: notesEngagementRef.current.topics,
            timestamp: getISTISOString(),
          });
        }
      }
    };
  }, []);

  // Handle unit access denied from left sidebar
  const handleUnitAccessDenied = (requiredPlan, unitNumber) => {
    setRequiredPlan(requiredPlan);
    setTargetUnit(unitNumber);
    setShowPlanPopUp(true);
  };

  // Helper functions for Q&A and Notes tracking
  const trackQnAEngagement = (unit, questionId) => {
    const key = `${unit}-${questionId}`;
    if (!qnaEngagementRef.current.startTimes[key]) {
      qnaEngagementRef.current.startTimes[key] = Date.now();
    }
  };

  const endQnAEngagement = (unit, questionId) => {
    const key = `${unit}-${questionId}`;
    const startTime = qnaEngagementRef.current.startTimes[key];
    if (startTime) {
      const durationMs = Date.now() - startTime;
      const durationSec = Math.floor(durationMs / 1000);

      // Only track if duration > 0 and not already tracked
      if (durationSec > 0) {
        const alreadyTracked = qnaEngagementRef.current.questions.some(
          (q) => q.unit === unit && q.question_id === questionId,
        );

        if (!alreadyTracked) {
          qnaEngagementRef.current.questions.push({
            unit: parseInt(unit),
            question_id: questionId,
            duration: durationSec,
          });
        }
      }
      delete qnaEngagementRef.current.startTimes[key];
    }
  };

  const trackNotesEngagement = (unit, topicId) => {
    const key = `${unit}-${topicId}`;
    if (!notesEngagementRef.current.startTimes[key]) {
      notesEngagementRef.current.startTimes[key] = Date.now();
    }
  };

  const endNotesEngagement = (unit, topicId) => {
    const key = `${unit}-${topicId}`;
    const startTime = notesEngagementRef.current.startTimes[key];
    if (startTime) {
      const durationMs = Date.now() - startTime;
      const durationSec = Math.floor(durationMs / 1000);

      // Only track if duration > 0 and not already tracked
      if (durationSec > 0) {
        const alreadyTracked = notesEngagementRef.current.topics.some(
          (t) => t.unit === unit && t.topic_id === topicId,
        );

        if (!alreadyTracked) {
          notesEngagementRef.current.topics.push({
            unit: parseInt(unit),
            topic_id: topicId,
            duration: durationSec,
          });
        }
      }
      delete notesEngagementRef.current.startTimes[key];
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
          <BookDashboardLeftSec
            currentSection={currentSection}
            onUnitAccessDenied={handleUnitAccessDenied}
          />

          {BookDashboardSections.filter(
            (section) => section.title === currentSection,
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
                  trackQnAEngagement={trackQnAEngagement}
                  endQnAEngagement={endQnAEngagement}
                  trackNotesEngagement={trackNotesEngagement}
                  endNotesEngagement={endNotesEngagement}
                />
                <RightComponent />
              </React.Fragment>
            );
          })}
        </div>

        {/* === MOBILE LAYOUT === */}
        <div className="mobile-layout">
          <div className="left-right-wrapper">
            <BookDashboardLeftSec
              currentSection={currentSection}
              onUnitAccessDenied={handleUnitAccessDenied}
            />
            {BookDashboardSections.filter(
              (section) => section.title === currentSection,
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
              (section) => section.title === currentSection,
            ).map((section, index) => {
              const Component = section.component;
              return (
                <Component
                  key={"mid-" + index}
                  currentSection={currentSection}
                  handleSectionChange={handleSectionChange}
                  selectedUnitId={parseInt(selectedUnit)}
                  trackQnAEngagement={trackQnAEngagement}
                  endQnAEngagement={endQnAEngagement}
                  trackNotesEngagement={trackNotesEngagement}
                  endNotesEngagement={endNotesEngagement}
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
          currentPlan={
            getCurrentCourse()
              ? getUserPlanForCourse(getCurrentCourse().id)
              : "Free"
          }
          targetUnit={targetUnit}
        />
      )}
    </div>
  );
}

export default BookDashboard;
