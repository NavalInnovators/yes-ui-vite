import React, { useState, useRef, useEffect, useMemo } from "react";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Style for code blocks
import "./BookDashboardMidSec.css";
import { LeftPageArrow, RightPageArrow, Lock } from "../assets";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardResponsiveUnitDropdown from "./BookDashboardResponsiveUnitDropdown";
import BookDashboardResponsiveTopicsDropdown from "./BookDashboardResponsiveTopicsDropdown";
import { useBookDashboard } from "../context/book-dashboard-context";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import { summarizeAnswer, rephraseAnswer } from "../api/api";
import { type } from "@testing-library/user-event/dist/type";
import FilterIcon from "../roles/components/icons/FilterIcon";
import { Crown } from "lucide-react";
import { isPro, isBasic } from "../utils/planUtils";
import {
  trackRephraserUsed,
  trackSummariserUsed,
  getISTISOString,
} from "../utils/analytics";
import { getCourseTrackingMeta } from "../utils/courseUtils";

function BookDashboardMidSec({
  currentSection,
  handleSectionChange,
  trackQnAEngagement,
  endQnAEngagement,
}) {
  const {
    selectedUnit,
    qList,
    selectedQuestion,
    setSelectedQuestion,
    qnaLoading,
    qnaError,
    selectedQnATopic,
    setSelectedQnATopic,
    qnaTopics,
    setFilteredQnAQuestions,
    subCode,
  } = useBookDashboard();

  const {
    getLifetimeUsage,
    incrementLifetimeUsage,
    checkLifetimeLimit,
    getRemainingUsage,
    getUserPlanForCourse,
  } = useCart();

  const courseMeta = useMemo(() => getCourseTrackingMeta(subCode), [subCode]);
  const currentCourse = courseMeta.course;
  const courseId = currentCourse?.id || null;
  const courseName = courseMeta.courseName;
  const subjectCode = courseMeta.subjectCode;

  const summaryRef = useRef(null);
  const rephraserRef = useRef(null);

  // Usage counter component
  const UsageCounter = ({ feature }) => {
    const userPlan = courseId ? getUserPlanForCourse(courseId) : "Free";
    const hasPaidPlan = isPro(userPlan) || isBasic(userPlan);

    // If user has any paid plan, don't show counters
    if (hasPaidPlan) {
      return null;
    }

    // Only show for Free plan users
    if (userPlan !== "Free") {
      return null;
    }

    // Final safety check - if we can't determine the plan, don't show counters
    if (!userPlan || userPlan === "undefined" || userPlan === "null") {
      return null;
    }

    const currentUsage = getLifetimeUsage(feature);
    const remaining = getRemainingUsage(feature);
    const isLimitExceeded = !checkLifetimeLimit(feature);

    if (isLimitExceeded) {
      return <span className="usage-counter-crown"><Crown size={16} color="#FFD700" /></span>;
    }

    return <span className="usage-counter">{currentUsage}/50</span>;
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Get topics for current unit only
  const getCurrentUnitTopics = () => {
    const unitQuestions = qList[selectedUnit - 1] || [];
    const uniqueTopics = new Set();
    unitQuestions.forEach((q) => {
      // Try multiple possible topic field names
      const topic = q.topic || q.topic_name || q.topicName;
      if (topic) {
        uniqueTopics.add(topic);
      }
    });
    return Array.from(uniqueTopics).sort();
  };

  const currentUnitTopics = getCurrentUnitTopics();

  // Get filtered questions based on selected topic
  const getFilteredQuestions = () => {
    const unitQuestions = qList[selectedUnit - 1] || [];
    if (selectedQnATopic === "All Topics") {
      return unitQuestions;
    }
    // Try multiple possible topic field names
    return unitQuestions.filter(
      (q) =>
        q.topic === selectedQnATopic ||
        q.topic_name === selectedQnATopic ||
        q.topicName === selectedQnATopic,
    );
  };

  const filteredQuestions = getFilteredQuestions();
  const totalPages = filteredQuestions.length;

  const [summaryList, setSummaryList] = useState([]);
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const getSummaryKey = (unit, index) => `summaryList_u${unit}_q${index}`;

  // Rephrased answers states
  const [rephrasedList, setRephrasedList] = useState([]);
  const [rephraseIndex, setRephraseIndex] = useState(0);
  const [rephraseLoading, setRephraseLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("0");

  // Rephrasing styles and labels
  const getStyleLabel = (styleNum) => {
    switch (styleNum) {
      case 1:
        return "Simple language";
      case 2:
        return "Include Analogy";
      case 3:
        return "Include Examples";
      default:
        return "Unknown style";
    }
  };
  const getRephrasedKey = (unit, index) => `rephrasedList_u${unit}_q${index}`;

  const handleSummarize = async () => {
  const userPlan = courseId ? getUserPlanForCourse(courseId) : "Free";

  if (userPlan === "Free" && !checkLifetimeLimit("Summariser")) {
    toast.error(
      "You have reached your lifetime limit of 50 summaries. Please upgrade to Basic plan for unlimited usage.",
    );
    return;
  }

  const currentKey = getSummaryKey(selectedUnit, selectedQuestion);
  const existingSummaries =
    JSON.parse(localStorage.getItem(currentKey)) || [];

  if (existingSummaries.length > 0 && summaryList.length === 0) {
    setSummaryList(existingSummaries);
    setSummaryIndex(0);
    
    // Scroll to summary section 
    setTimeout(() => {
      if (summaryRef.current) {
        const scrollEndHandler = () => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth'
          });
          window.removeEventListener('scrollend', scrollEndHandler);
        };
        
        window.addEventListener('scrollend', scrollEndHandler);
        
        summaryRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);
    return;
  }

  if (existingSummaries.length >= 3) {
    toast.error(
      "You have reached the limit, can't generate more than 3 summaries.",
    );
    return;
  }

  if (existingSummaries.length > 0) {
    const confirm = window.confirm(
      "You've already generated a summary. Do you want to generate another one?",
    );
    if (!confirm) return;
  }

  if (!question || !answer || !questionId) {
    toast.error("Question or answer not available for summarization.");
    return;
  }

  setSummaryLoading(true);
  toast.info("Summarizing answer...");
  try {
    const newSummary = await summarizeAnswer(questionId);
    
    let summaryToStore = newSummary;
    if (typeof newSummary === 'object' && newSummary !== null) {
      summaryToStore = newSummary.summary || newSummary.summarized_answer || newSummary.text || newSummary.content;
    }
    
    const updatedSummaries = [...existingSummaries, summaryToStore];
    setSummaryList(updatedSummaries);
    setSummaryIndex(updatedSummaries.length - 1);
    localStorage.setItem(currentKey, JSON.stringify(updatedSummaries));

    // Scroll to summary section
    setTimeout(() => {
      if (summaryRef.current) {
        const scrollEndHandler = () => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth'
          });
          window.removeEventListener('scrollend', scrollEndHandler);
        };
        
        window.addEventListener('scrollend', scrollEndHandler);
        
        summaryRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);

    if (userPlan === "Free") {
      incrementLifetimeUsage("Summariser");
    }

    const currentUsageCount =
      userPlan === "Free" ? getLifetimeUsage("Summariser") : null;

    trackSummariserUsed({
      courseId,
      courseName,
      subjectCode,
      unit: selectedUnit,
      questionId,
      topic: questionTopic,
      timestamp: getISTISOString(),
      usageCount: currentUsageCount,
    });
  } catch (err) {
    const errorMessage = err.message || "Failed to summarize the answer";
    toast.error(errorMessage);
    console.error(err);
  } finally {
    setSummaryLoading(false);
  }
};

const handleRephrase = async (e) => {
  const value = e.target.value;
  const style = parseInt(value, 10);
  setSelectedStyle(value);
  if (value === "0") return;

  const userPlan = courseId ? getUserPlanForCourse(courseId) : "Free";
  const styleLabel = getStyleLabel(style);

  if (userPlan === "Free" && !checkLifetimeLimit("Rephraser")) {
    toast.error(
      "You have reached your lifetime limit of 50 rephrases. Please upgrade to Basic plan for unlimited usage.",
    );
    setSelectedStyle("0");
    return;
  }

  const existingRephrased = JSON.parse(localStorage.getItem(getRephrasedKey(selectedUnit, selectedQuestion))) || [];
  if (existingRephrased.length > 0 && rephrasedList.length === 0) {
    setRephrasedList(existingRephrased);
    setRephraseIndex(0);
    
    // Scroll to rephraser section
    setTimeout(() => {
      if (rephraserRef.current) {
        const scrollEndHandler = () => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth'
          });
          window.removeEventListener('scrollend', scrollEndHandler);
        };
        
        window.addEventListener('scrollend', scrollEndHandler);
        
        rephraserRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);
  }

  if (!summaryList[0] || !answer) {
    toast.error("Please summarize the answer first.");
    setSelectedStyle("0");
    return;
  }

  if (rephrasedList.some((item) => item.style === style)) {
    const idx = rephrasedList.findIndex((item) => item.style === style);
    setRephraseIndex(idx);
    setSelectedStyle("0");
    
    // Scroll to rephraser section
    setTimeout(() => {
      if (rephraserRef.current) {
        const scrollEndHandler = () => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth'
          });
          window.removeEventListener('scrollend', scrollEndHandler);
        };
        
        window.addEventListener('scrollend', scrollEndHandler);
        
        rephraserRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);
    return;
  }

  toast.info("Rephrasing...");
  setRephraseLoading(true);

  try {
    const rephrased = await rephraseAnswer(questionId, style);
    
    let rephrasedToStore = rephrased;
    if (typeof rephrased === 'object' && rephrased !== null) {
      rephrasedToStore = rephrased.content || rephrased.rephrased_text || rephrased.text || rephrased.answer;
    }
    
    const updatedList = [...rephrasedList, { style, answer: rephrasedToStore }];
    setRephrasedList(updatedList);
    setRephraseIndex(updatedList.length - 1);
    localStorage.setItem(
      getRephrasedKey(selectedUnit, selectedQuestion),
      JSON.stringify(updatedList),
    );
    toast.success("Rephrased successfully.");

    // Scroll to rephraser section
    setTimeout(() => {
      if (rephraserRef.current) {
        const scrollEndHandler = () => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth'
          });
          window.removeEventListener('scrollend', scrollEndHandler);
        };
        
        window.addEventListener('scrollend', scrollEndHandler);
        
        rephraserRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);

    if (userPlan === "Free") {
      incrementLifetimeUsage("Rephraser");
    }

    const currentUsageCount =
      userPlan === "Free" ? getLifetimeUsage("Rephraser") : null;

    trackRephraserUsed({
      courseId,
      courseName,
      subjectCode,
      unit: selectedUnit,
      questionId,
      topic: questionTopic,
      style: styleLabel,
      timestamp: getISTISOString(),
      usageCount: currentUsageCount,
    });
  } catch (err) {
    toast.error(err.message || "Failed to rephrase.");
  } finally {
    setRephraseLoading(false);
    setSelectedStyle("0");
  }
};

  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setSelectedQuestion((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
      setSelectedQuestion((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  const handleRephrasePrev = () => {
    if (rephraseIndex > 0) setRephraseIndex(rephraseIndex - 1);
  };

  const handleRephraseNext = () => {
    if (rephraseIndex < rephrasedList.length - 1)
      setRephraseIndex(rephraseIndex + 1);
  };

  const question = filteredQuestions[selectedQuestion]?.question;
  const answer = filteredQuestions[selectedQuestion]?.solution;
  const currentQuestionData = filteredQuestions[selectedQuestion] || {};
  const questionId =
    currentQuestionData.qid ||
    currentQuestionData.id ||
    currentQuestionData._id ||
    currentQuestionData.questionId ||
    currentQuestionData.question_id ||
    null;
  const questionTopic =
    currentQuestionData.topic ||
    currentQuestionData.topic_name ||
    currentQuestionData.topicName ||
    null;

  // Track Q&A engagement
  useEffect(() => {
    // Use questionId if available, otherwise use selectedQuestion index + 1 (1-based)
    const trackingId = questionId || selectedQuestion + 1;

    if (trackingId != null && trackQnAEngagement && endQnAEngagement) {
      trackQnAEngagement(selectedUnit, trackingId);

      return () => {
        endQnAEngagement(selectedUnit, trackingId);
      };
    }
  }, [
    questionId,
    selectedQuestion,
    selectedUnit,
    trackQnAEngagement,
    endQnAEngagement,
  ]);

  useEffect(() => {
    // Check for existing summaries
    const summaryKey = getSummaryKey(selectedUnit, selectedQuestion);
    const existingSummaries = JSON.parse(localStorage.getItem(summaryKey)) || [];
    
    if (existingSummaries.length > 0) {
      setSummaryList(existingSummaries);
      setSummaryIndex(0);
    } else {
      setSummaryList([]);
      setSummaryIndex(0);
    }

    // Check for existing rephrased answers
    const rephrasedKey = getRephrasedKey(selectedUnit, selectedQuestion);
    const existingRephrased = JSON.parse(localStorage.getItem(rephrasedKey)) || [];
    
    if (existingRephrased.length > 0) {
      setRephrasedList(existingRephrased);
      setRephraseIndex(0);
    } else {
      setRephrasedList([]);
      setRephraseIndex(0);
    }
  }, [selectedQuestion, selectedUnit]);

  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      themeVariables: {
        nodePadding: 10, // Increase padding
        nodeMinWidth: 10, // Set minimum node width
        nodeMinHeight: 10, // Set minimum node height
        fontSize: "14px", // Adjust font size
      },
    });

    if (containerRef.current) {
      console.log("ContainerRef is: ", containerRef);
      console.log("ContainerRef.current is: ", containerRef.current);
      const mermaidElements = containerRef.current.querySelectorAll(".mermaid");
      console.log("containerRef.current.querySelectorAll", mermaidElements);

      // Clear previous Mermaid content
      mermaidElements.forEach((element) => {
        const code = element.getAttribute("data-mermaid-content");
        element.removeAttribute("data-processed"); // Important: remove old Mermaid tracking
        element.innerHTML = code || "";
      });

      if (mermaidElements.length > 0) {
        console.log("Mermaid elements.length is > 0");
        // Use setTimeout to ensure DOM is fully settled before initializing Mermaid
        setTimeout(() => {
          try {
            // mermaid.init(undefined, mermaidElements);
            mermaid.run({
              nodes: mermaidElements,
            });
          } catch (error) {
            console.error("Some Error rendering Mermaid diagrams:");
          }
        }, 100); // Delay of 100ms to ensure the DOM is ready
      } else {
        console.log("Mermaid elements.length is not > 0");
        console.warn("No Mermaid elements found in the content.");
      }
    }
  }, [answer]);

  useEffect(() => {
    setPageNumber(1);
    setSelectedQuestion(0);
    setSelectedQnATopic("All Topics"); // Reset topic filter when unit changes
  }, [selectedUnit]);

  // Reset selected question when topic filter changes
  useEffect(() => {
    setPageNumber(1);
    setSelectedQuestion(0);
  }, [selectedQnATopic]);

  // Update filtered questions in context for right sidebar
  useEffect(() => {
    setFilteredQnAQuestions(filteredQuestions);
  }, [filteredQuestions, setFilteredQnAQuestions]);

  // Function to process content dynamically
  const renderContent = (rawContent) => {
    const decodeMermaidCode = (text) => {
      return text
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/<\/?p\s*\/?>/g, "")
        .replace(/<code class=[\s\S]*?>/g, "")
        .replace(/<\/code\s*\/?>/g, "")
        .replace(/<pre[^>]*>/g, "") // Remove <pre> tag
        .replace(/<\/pre>/g, "") // Remove </pre> tag
        .replace(/<code[^>]*>/g, "") // Remove <code> tag
        .replace(/<\/code>/g, ""); // Remove </code> tag
    };
    let parts = [];
    parts = rawContent.split(/\\`\\`\\`(mermaid|code)([\s\S]*?)\\`\\`\\`/g);
    console.log("Parts:", parts);

    return (
      <div className="rendered-content">
        {" "}
        {/* Wrapper with custom class */}
        {parts.map((part, index) => {
          if (index % 3 === 0) {
            // Regular text content
            return (
              <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
            );
          } else if (parts[index - 1] === "mermaid") {
            // Mermaid block: Decode and render the mermaid code
            const mermaidCode = decodeMermaidCode(part.trim());
            console.log("replaced mermaid code is:", mermaidCode);
            return (
              <div
                key={index}
                className="mermaid"
                data-mermaid-content={mermaidCode}
                // style={{ color: "red" }}
              >
                {mermaidCode}
              </div>
            );
          } else if (parts[index - 1] === "code") {
            // Code block
            const code = decodeMermaidCode(part.trim());
            return (
              <SyntaxHighlighter
                key={index}
                language="javascript"
                style={dracula}
                wrapLongLines={true}
              >
                {code}
                {/* {part.trim()} */}
              </SyntaxHighlighter>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="book-dashboard-mid-sec">
      <BookDashboardNavbar
        currentSection={currentSection}
        handleSectionChange={handleSectionChange}
      />
      <div className="not-for-small-screens">
        {/* === Pagination === */}
        <div className="parent-pagination-dropdown">
          <div className="pagination-container">
            <span className="total-items">Total: {totalPages}</span>

            {/* Previous Button */}
            <button
              className="pagination-btn"
              onClick={handlePrevClick}
              disabled={parseInt(selectedQuestion) + 1 === 1}
            >
              <img src={LeftPageArrow} alt="Previous" />
            </button>
            <input
              className="page-number"
              type="text"
              value={parseInt(selectedQuestion) + 1}
              readOnly
            />
            <button
              className="pagination-btn"
              onClick={handleNextClick}
              disabled={parseInt(selectedQuestion) + 1 === totalPages}
            >
              <img src={RightPageArrow} alt="Next" />
            </button>
          </div>

          {/* AI Utility Buttons and Topic Filter */}
          <div className="ai-buttons">
            <button className="ai-btn summarizer-btn" onClick={handleSummarize}>
              {summaryLoading ? "Summarizing..." : "Summarizer"}
              <UsageCounter feature="Summariser" />
            </button>
            <div className="rephraser-container">
              <select
                className="ai-btn rephraser-select"
                onChange={handleRephrase}
                value={selectedStyle}
              >
                <option value="0">Rephraser</option>
                <option value="1">Simple language</option>
                <option value="2">Include Analogy</option>
                <option value="3">Include Examples</option>
              </select>
              <UsageCounter feature="Rephraser" />
            </div>
            <div className="topic-filter-container">
              <select
                className="book-dashboard-dropdown common-css-dropdown"
                value={selectedQnATopic}
                onChange={(e) => setSelectedQnATopic(e.target.value)}
              >
                <option value="All Topics">All Topics</option>
                {currentUnitTopics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="mobile-filter-button-container">
            <button
              className="mobile-filter-button"
              onClick={() => setShowMobileFilter(true)}
            >
              <FilterIcon size={20} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="book-dashboard-question-summary-container">
          {qnaLoading ? (
            <div>Loading Questions and Answers...</div>
          ) : qnaError ? (
            <div>
              Error loading Q&A data. Please contact support team or raise a
              query!
            </div>
          ) : question ? (
            <div className="QnA">
              <div className="book-dashboard-question">
                Question:
                {parse(question)}
              </div>

              <div className="book-dashboard-answer">
                <div
                  key={`answer_${selectedUnit}_${selectedQuestion}`}
                  ref={containerRef}
                >
                  {renderContent(answer)}
                </div>
              </div>
            </div>
          ) : (
            <div>Data will be available soon!</div>
          )}

          {/* SUMMARY */}
          <div className="book-dashboard-summary" ref={summaryRef}>
            Summary of this question
          </div>
          <div className="book-dashboard-summary-answer">
            <div className="book-dashboard-inner-summary">
              {summaryLoading ? (
                <div>Loading summary...</div>
              ) : summaryList.length > 0 ? (
                <>
                  {parse(summaryList[summaryIndex])}
                  <div className="summary-pagination-controls">
                    <div
                      disabled={summaryIndex === 0}
                      onClick={() =>
                        setSummaryIndex((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      ◀
                    </div>
                    <span>
                      {summaryIndex + 1} of {summaryList.length}
                    </span>
                    <div
                      disabled={summaryIndex === summaryList.length - 1}
                      onClick={() =>
                        setSummaryIndex((prev) =>
                          Math.min(prev + 1, summaryList.length - 1),
                        )
                      }
                    >
                      ▶
                    </div>
                  </div>
                </>
              ) : (
                <div>Click the summarizer button to generate summary.</div>
              )}
            </div>

            {/* <img src={Lock} alt="" /> */}
            {/* <button
              className="book-dashboard-unlock-button"
              onClick={() => toast.info("This feature will be live in next update!")}
            >
              Unlock Now
            </button> */}
          </div>

          {/** Rephraser */}
          <div className="book-dashboard-summary" ref={rephraserRef}>
            Rephrased answer
          </div>
          <div className="book-dashboard-summary-answer">
            <div className="book-dashboard-inner-summary">
              {rephraseLoading ? (
                "Rephrasing..."
              ) : rephrasedList.length > 0 ? (
                <>
                  {parse(rephrasedList[rephraseIndex].answer)}
                  <div className="summary-pagination-controls">
                    <button
                      disabled={rephraseIndex === 0}
                      onClick={handleRephrasePrev}
                    >
                      ◀
                    </button>
                    <span>
                      {rephraseIndex + 1} / {rephrasedList.length} :{" "}
                      {getStyleLabel(rephrasedList[rephraseIndex].style)}
                    </span>
                    <button
                      disabled={rephraseIndex === rephrasedList.length - 1}
                      onClick={handleRephraseNext}
                    >
                      ▶
                    </button>
                  </div>
                </>
              ) : (
                "Select a rephrasing style to rephrase the summarized answer."
              )}
            </div>
          </div>
        </div>
        {/* Lower Pagination */}
        <div className="lower-pagination-container">
          <button
            className="lower-pagination-btn-left"
            onClick={handlePrevClick}
            disabled={parseInt(selectedQuestion) + 1 === 1}
          >
            <img src={LeftPageArrow} alt="Previous" />
            <label htmlFor="Previous">Previous</label>
          </button>
          <input
            className="lower-page-number"
            type="text"
            value={parseInt(selectedQuestion) + 1}
            readOnly
          />
          <button
            className="lower-pagination-btn-right"
            onClick={handleNextClick}
            disabled={parseInt(selectedQuestion) + 1 === totalPages}
          >
            <label htmlFor="Next">Next</label>
            <img src={RightPageArrow} alt="Next" />
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="mobile-filter-modal">
          <div className="mobile-filter-content">
            <div className="mobile-filter-header">
              <h3>Filter by Topic</h3>
              <button
                className="close-filter-btn"
                onClick={() => setShowMobileFilter(false)}
              >
                ×
              </button>
            </div>
            <div className="mobile-filter-options">
              <button
                className={`mobile-filter-option ${
                  selectedQnATopic === "All Topics" ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedQnATopic("All Topics");
                  setShowMobileFilter(false);
                }}
              >
                All Topics
              </button>
              {currentUnitTopics.map((topic, index) => (
                <button
                  key={index}
                  className={`mobile-filter-option ${
                    selectedQnATopic === topic ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedQnATopic(topic);
                    setShowMobileFilter(false);
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDashboardMidSec;
