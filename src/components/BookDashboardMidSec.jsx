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
import { NoData, DataAvailableSoon } from "./EmptyStates";
import { QnASkeletonLoader } from "./BookDashboardSkeletons";


// --- Mermaid Helpers ---

async function checkMermaidSyntax(code) {
  try {
    await mermaid.parse(code);
    return { valid: true, errors: [] };
  } catch (err) {
    return {
      valid: false,
      errors: [err.message]
    };
  }
}

function autoFixMermaid(code) {
  let fixed = code;

  // 1. Fix style on same line as node
  fixed = fixed.replace(
    /^(\s*\w+\[.*?\])\s+style\s+(\w+.*)$/gm,
    (_, node, style) => `${node}\nstyle ${style}`
  );

  // 2. Fix invalid arrows
  fixed = fixed.replace(/==>/g, '-->');
  fixed = fixed.replace(/--->/g, '-->');

  // 3. Add default diagram type if missing
  if (!/^(flowchart|graph|sequenceDiagram)/.test(fixed.trim())) {
    fixed = `flowchart LR\n${fixed}`;
  }

  return fixed;
}

// --- Shadow HTML Component ---

const ShadowHTMLDisplay = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const shadowRoot =
      containerRef.current.shadowRoot ||
      containerRef.current.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = content;
  }, [content]);

  return (
    <div
      ref={containerRef}
    // style={{
    //   display: "block",
    // }}
    />
  );
};

// --- Mermaid Component ---

const MermaidRenderer = ({ code }) => {
  const containerRef = useRef(null);
  const [finalCode, setFinalCode] = useState(null);

  useEffect(() => {
    let active = true;
    const validateAndFix = async () => {
      // 1. Check syntax
      const result = await checkMermaidSyntax(code);
      if (result.valid) {
        if (active) setFinalCode(code);
        return;
      }

      // 2. Try auto-fix
      const fixed = autoFixMermaid(code);
      const fixedResult = await checkMermaidSyntax(fixed);

      if (active) {
        if (fixedResult.valid) {
          setFinalCode(fixed);
        } else {
          console.error("Mermaid invalid after fix:", fixedResult.errors);
          setFinalCode(null);
        }
      }
    };

    validateAndFix();
    return () => { active = false; };
  }, [code]);

  useEffect(() => {
    if (finalCode && containerRef.current) {
      containerRef.current.removeAttribute("data-processed");
      containerRef.current.innerHTML = finalCode;
      mermaid.run({
        nodes: [containerRef.current],
      }).catch(err => console.error("Mermaid run error:", err));
    }
  }, [finalCode]);

  if (!finalCode) return null;

  return (
    <div
      className="mermaid"
      ref={containerRef}
      data-mermaid-content={finalCode}
    />
  );
};

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
      return (
        <span className="usage-counter-crown">
          <Crown size={16} color="#FFD700" />
        </span>
      );
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

  const getSummariesStorageKey = () => "summaries_data";
  const getRephrasedStorageKey = () => "rephrased_data";

  const getSummariesData = () => {
    try {
      const data = localStorage.getItem(getSummariesStorageKey());
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing summaries data:", error);
      return [];
    }
  };

  const getRephrasedData = () => {
    try {
      const data = localStorage.getItem(getRephrasedStorageKey());
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing rephrased data:", error);
      return [];
    }
  };

  const saveSummariesData = (data) => {
    try {
      localStorage.setItem(getSummariesStorageKey(), JSON.stringify(data));
    } catch (error) {
      console.error("Error saving summaries data:", error);
    }
  };

  const saveRephrasedData = (data) => {
    try {
      localStorage.setItem(getRephrasedStorageKey(), JSON.stringify(data));
    } catch (error) {
      console.error("Error saving rephrased data:", error);
    }
  };

  const getSummariesForQuestion = (courseCode, unitNo, questionId) => {
    const allSummaries = getSummariesData();
    return allSummaries.filter(
      (item) =>
        item.courseCode === courseCode &&
        item.unitNo === unitNo &&
        item.questionId === questionId,
    );
  };

  const saveSummaryForQuestion = (courseCode, unitNo, questionId, summary) => {
    const allSummaries = getSummariesData();
    const newSummary = {
      courseCode,
      unitNo,
      questionId,
      summary,
      timestamp: new Date().toISOString(),
    };
    allSummaries.push(newSummary);
    saveSummariesData(allSummaries);
  };

  const getRephrasedForQuestion = (courseCode, unitNo, questionId) => {
    const allRephrased = getRephrasedData();
    return allRephrased.filter(
      (item) =>
        item.courseCode === courseCode &&
        item.unitNo === unitNo &&
        item.questionId === questionId,
    );
  };

  const saveRephrasedForQuestion = (
    courseCode,
    unitNo,
    questionId,
    style,
    answer,
  ) => {
    const allRephrased = getRephrasedData();
    const newRephrased = {
      courseCode,
      unitNo,
      questionId,
      style,
      answer,
      timestamp: new Date().toISOString(),
    };
    allRephrased.push(newRephrased);
    saveRephrasedData(allRephrased);
  };

  // Rephrased answers states
  const [rephrasedList, setRephrasedList] = useState([]);
  const [rephraseIndex, setRephraseIndex] = useState(0);
  const [rephraseLoading, setRephraseLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("0");
  const [showOriginal, setShowOriginal] = useState(true);

  const getShowOriginalStorageKey = () =>
    `showOriginal_${subCode}_${selectedUnit}_${questionId}`;

  const getShowOriginalFromStorage = () => {
    try {
      const key = getShowOriginalStorageKey();
      const stored = sessionStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : true;
    } catch (error) {
      console.error("Error reading showOriginal from storage:", error);
      return true;
    }
  };

  const saveShowOriginalToStorage = (value) => {
    try {
      const key = getShowOriginalStorageKey();
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving showOriginal to storage:", error);
    }
  };

  // Rephrasing styles and labels
  const getStyleLabel = (styleNum) => {
    switch (styleNum) {
      // case 1:
      //   return "Simple language";
      case 2:
        return "Include Analogy";
      case 3:
        return "Include Examples";
      default:
        return "Unknown style";
    }
  };

  const handleSummarize = async () => {
    const userPlan = courseId ? getUserPlanForCourse(courseId) : "Free";

    if (userPlan === "Free" && !checkLifetimeLimit("Summariser")) {
      toast.error(
        "You have reached your lifetime limit of 50 summaries. Please upgrade to Basic plan for unlimited usage.",
      );
      return;
    }

    const existingSummaries = getSummariesForQuestion(
      subCode,
      selectedUnit,
      questionId,
    );

    if (existingSummaries.length > 0 && summaryList.length === 0) {
      const summariesOnly = existingSummaries.map((item) => item.summary);
      setSummaryList(summariesOnly);
      setSummaryIndex(0);

      // Scroll to summary section
      setTimeout(() => {
        if (summaryRef.current) {
          const scrollEndHandler = () => {
            window.scrollBy({
              top: 100,
              behavior: "smooth",
            });
            window.removeEventListener("scrollend", scrollEndHandler);
          };

          window.addEventListener("scrollend", scrollEndHandler);

          summaryRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
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
      if (typeof newSummary === "object" && newSummary !== null) {
        summaryToStore =
          newSummary.summary ||
          newSummary.summarized_answer ||
          newSummary.text ||
          newSummary.content;
      }

      saveSummaryForQuestion(subCode, selectedUnit, questionId, summaryToStore);

      const updatedSummaries = [...summaryList, summaryToStore];
      setSummaryList(updatedSummaries);
      setSummaryIndex(updatedSummaries.length - 1);

      // Scroll to summary section
      setTimeout(() => {
        if (summaryRef.current) {
          const scrollEndHandler = () => {
            window.scrollBy({
              top: 100,
              behavior: "smooth",
            });
            window.removeEventListener("scrollend", scrollEndHandler);
          };

          window.addEventListener("scrollend", scrollEndHandler);

          summaryRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
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

    const existingRephrased = getRephrasedForQuestion(
      subCode,
      selectedUnit,
      questionId,
    );

    if (existingRephrased.length > 0 && rephrasedList.length === 0) {
      const formattedRephrased = existingRephrased.map((item) => ({
        style: item.style,
        answer: item.answer,
      }));
      setRephrasedList(formattedRephrased);
      setRephraseIndex(0);

      // Show rephrased answer if rephrased versions exist
      setShowOriginal(false);
      saveShowOriginalToStorage(false);

      // Scroll to rephraser section
      setTimeout(() => {
        if (rephraserRef.current) {
          const scrollEndHandler = () => {
            window.scrollBy({
              top: 100,
              behavior: "smooth",
            });
            window.removeEventListener("scrollend", scrollEndHandler);
          };

          window.addEventListener("scrollend", scrollEndHandler);

          rephraserRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
      return;
    }

    if (!answer) {
      toast.error("No answer available to rephrase.");
      setSelectedStyle("0");
      return;
    }

    if (existingRephrased.some((item) => item.style === style)) {
      const idx = existingRephrased.findIndex((item) => item.style === style);
      setRephraseIndex(idx);
      setSelectedStyle("0");

      setShowOriginal(false);
      saveShowOriginalToStorage(false);

      // Scroll to rephraser section
      setTimeout(() => {
        if (rephraserRef.current) {
          const scrollEndHandler = () => {
            window.scrollBy({
              top: 100,
              behavior: "smooth",
            });
            window.removeEventListener("scrollend", scrollEndHandler);
          };

          window.addEventListener("scrollend", scrollEndHandler);

          rephraserRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
      return;
    }

    toast.info("Rephrasing...");
    setRephraseLoading(true);

    try {
      let rephrasedToStore = await rephraseAnswer(questionId, style);
      if (typeof rephrasedToStore === "object" && rephrasedToStore !== null) {
        rephrasedToStore = rephrasedToStore.content || "";
      }

      saveRephrasedForQuestion(
        subCode,
        selectedUnit,
        questionId,
        style,
        rephrasedToStore,
      );

      const updatedList = [
        ...rephrasedList,
        { style, answer: rephrasedToStore },
      ];
      setRephrasedList(updatedList);
      setRephraseIndex(updatedList.length - 1);

      setShowOriginal(false);
      saveShowOriginalToStorage(false);

      toast.success("Rephrased successfully.");

      // Scroll to rephraser section
      setTimeout(() => {
        if (rephraserRef.current) {
          const scrollEndHandler = () => {
            window.scrollBy({
              top: 100,
              behavior: "smooth",
            });
            window.removeEventListener("scrollend", scrollEndHandler);
          };

          window.addEventListener("scrollend", scrollEndHandler);

          rephraserRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
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
    const existingSummaries = getSummariesForQuestion(
      subCode,
      selectedUnit,
      questionId,
    );

    if (existingSummaries.length > 0) {
      const summariesOnly = existingSummaries.map((item) => item.summary);
      setSummaryList(summariesOnly);
      setSummaryIndex(0);
    } else {
      setSummaryList([]);
      setSummaryIndex(0);
    }

    // Check for existing rephrased answers
    const existingRephrased = getRephrasedForQuestion(
      subCode,
      selectedUnit,
      questionId,
    );

    if (existingRephrased.length > 0) {
      const formattedRephrased = existingRephrased.map((item) => ({
        style: item.style,
        answer: item.answer,
      }));
      setRephrasedList(formattedRephrased);
      setRephraseIndex(0);
    } else {
      setRephrasedList([]);
      setRephraseIndex(0);
    }
    const hasSessionStorageValue =
      sessionStorage.getItem(getShowOriginalStorageKey()) !== null;
    const storedShowOriginal =
      existingRephrased.length > 0 && hasSessionStorageValue
        ? getShowOriginalFromStorage()
        : true;
    setShowOriginal(storedShowOriginal);
  }, [selectedQuestion, selectedUnit, subCode, questionId]);

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
  }, []);


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
    if (typeof rawContent !== "string") {
      rawContent = rawContent.content;
    }
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
    // parts = rawContent.split(/```(mermaid|code)([\s\S]*?)```/g);
    const regex = /(?:```|\/`\/`\/`)(mermaid|code)([\s\S]*?)(?:```|\/`\/`\/`)/g;
    parts = rawContent.split(regex);
    // console.log("Parts:", parts);

    return (
      <div className="rendered-content">
        {" "}
        {/* Wrapper with custom class */}
        {parts.map((part, index) => {
          if (index % 3 === 0) {
            // Regular text content
            if (!part || !part.trim()) return null;
            return (
              <ShadowHTMLDisplay key={index} content={part} />
            );
          }
          else if (parts[index - 1] === "mermaid") {
            const mermaidCode = decodeMermaidCode(part.trim());
            return (
              <MermaidRenderer
                key={index}
                code={mermaidCode}
              />
            );
          }
          else if (parts[index - 1] === "code") {
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
              disabled={
                parseInt(selectedQuestion) + 1 === 1 || totalPages === 0
              }
            >
              <img src={LeftPageArrow} alt="Previous" />
            </button>
            <input
              className="page-number"
              type="text"
              value={totalPages === 0 ? 0 : parseInt(selectedQuestion) + 1}
              readOnly
            />
            <button
              className="pagination-btn"
              onClick={handleNextClick}
              disabled={
                parseInt(selectedQuestion) + 1 === totalPages ||
                totalPages === 0
              }
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
                {/* <option value="1">Simple language</option> */}
                <option value="2">Include Analogy</option>
                <option value="3">Include Examples</option>
              </select>
              <UsageCounter feature="Rephraser" />
            </div>
            {/* <div className="topic-filter-container">
                            <select
                                className="book-dashboard-dropdown common-css-dropdown"
                                value={selectedQnATopic}
                                onChange={(e) =>
                                    setSelectedQnATopic(e.target.value)
                                }
                            >
                                <option value="All Topics">All Topics</option>
                                {currentUnitTopics.map((topic, index) => (
                                    <option key={index} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                            </select>
                        </div> */}
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
            <QnASkeletonLoader />
          ) : qnaError ? (
            <NoData
              title="Error Loading Q&A"
              message="Error loading Q&A data. Please contact support team or raise a query!"
            />
          ) : filteredQuestions.length === 0 ? (
            selectedQnATopic !== "All Topics" ? (
              <NoData
                title="No Questions Found"
                message={`No questions found for the topic "${selectedQnATopic}". Try selecting a different topic or view all topics.`}
              />
            ) : qList[selectedUnit - 1]?.length > 0 ? (
              <NoData
                title="No Questions in Selected Topic"
                message="There are questions available in this unit, but none match your current topic filter. Try selecting 'All Topics' to see all available questions."
              />
            ) : (
              <DataAvailableSoon
                title="Questions Coming Soon"
                message="Questions and answers for this unit will be available soon. Check back later!"
              />
            )
          ) : question ? (
            <div className="QnA">
              <div className="book-dashboard-question">
                Question:
                {parse(question)}
              </div>

              <div className="book-dashboard-answer">
                {/* Show controls */}
                {rephrasedList.length > 0 && (
                  <div className="rephrased-controls">
                    <span className="rephrased-label">
                      {showOriginal
                        ? "Answer:"
                        : `Rephrased (${getStyleLabel(
                          rephrasedList[rephraseIndex].style,
                        )}):`}
                    </span>
                    <div className="rephrased-actions">
                      {!showOriginal && rephrasedList.length > 1 && (
                        <>
                          <button
                            className="nav-btn"
                            disabled={rephraseIndex === 0}
                            onClick={handleRephrasePrev}
                          >
                            ◀
                          </button>
                          <span className="version-info">
                            {rephraseIndex + 1}/{rephrasedList.length}
                          </span>
                          <button
                            className="nav-btn"
                            disabled={
                              rephraseIndex === rephrasedList.length - 1
                            }
                            onClick={handleRephraseNext}
                          >
                            ▶
                          </button>
                        </>
                      )}
                      <button
                        className="show-original-btn"
                        onClick={() => {
                          const newValue = !showOriginal;
                          setShowOriginal(newValue);
                          saveShowOriginalToStorage(newValue);
                        }}
                      >
                        {showOriginal ? "Show Rephrased" : "Show Original"}
                      </button>
                    </div>
                  </div>
                )}
                <div
                  key={`answer_${selectedUnit}_${selectedQuestion}`}
                  ref={containerRef}
                >
                  {!showOriginal && rephrasedList.length > 0
                    ? renderContent(rephrasedList[rephraseIndex].answer)
                    : renderContent(answer)}
                </div>
              </div>
            </div>
          ) : (
            <DataAvailableSoon
              title="Content Coming Soon"
              message="This question's content will be available soon!"
            />
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
        </div>
        {/* Lower Pagination */}
        <div className="lower-pagination-container">
          <button
            className="lower-pagination-btn-left"
            onClick={handlePrevClick}
            disabled={parseInt(selectedQuestion) + 1 === 1 || totalPages === 0}
          >
            <img src={LeftPageArrow} alt="Previous" />
            <label htmlFor="Previous">Previous</label>
          </button>
          <input
            className="lower-page-number"
            type="text"
            value={totalPages === 0 ? 0 : parseInt(selectedQuestion) + 1}
            readOnly
          />
          <button
            className="lower-pagination-btn-right"
            onClick={handleNextClick}
            disabled={
              parseInt(selectedQuestion) + 1 === totalPages || totalPages === 0
            }
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
                className={`mobile-filter-option ${selectedQnATopic === "All Topics" ? "active" : ""
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
                  className={`mobile-filter-option ${selectedQnATopic === topic ? "active" : ""
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
