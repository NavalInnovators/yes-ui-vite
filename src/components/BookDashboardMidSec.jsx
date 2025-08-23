import React, { useState, useRef, useEffect } from "react";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Style for code blocks
import "./BookDashboardMidSec.css";
import { LeftPageArrow, RightPageArrow, Lock } from "../assets";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardResponsiveUnitDropdown from "./BookDashboardResponsiveUnitDropdown";
import BookDashboardResponsiveTopicsDropdown from "./BookDashboardResponsiveTopicsDropdown";
import { useBookDashboard } from "../context/book-dashboard-context";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import { summarizeAnswer, rephraseAnswer } from "../api/api";
import { type } from "@testing-library/user-event/dist/type";
// Import Lottie animation
import Lottie from "lottie-react";
import ManHoldingNotes from "../assets/man-holding-note.json";


function BookDashboardMidSec({ currentSection, handleSectionChange }) {
  const {
    selectedUnit,
    qList,
    selectedQuestion,
    setSelectedQuestion,
    qnaLoading,
    qnaError,
  } = useBookDashboard();

  const summaryRef = useRef(null);
  const rephraserRef = useRef(null);


  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = qList[selectedUnit - 1]?.length;

  const [summaryList, setSummaryList] = useState([]);
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const getSummaryKey = (unit, index) => `summaryList_u${unit}_q${index}`;

  const handleSummarize = async () => {
    if (summaryRef.current) {
      const navbarOffset = 140; // Change this to match your navbar's height
      const summaryPosition = summaryRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: summaryPosition - navbarOffset, behavior: "smooth" });
    }

    const currentKey = getSummaryKey(selectedUnit, selectedQuestion);
    const existingSummaries = JSON.parse(localStorage.getItem(currentKey)) || [];

    if (existingSummaries.length >= 3) {
      toast.error("You have reached the limit, can't generate more than 3 summaries.");
      return;
    }

    if (existingSummaries.length > 0) {
      const confirm = window.confirm("You've already generated a summary. Do you want to generate another one?");
      if (!confirm) return;
    }

    if (!question || !answer) {
      toast.error("Question or answer not available for summarization.");
      return;
    }

    setSummaryLoading(true);
    toast.info("Summarizing answer...");
    try {
      const newSummary = await summarizeAnswer(question, answer);
      const updatedSummaries = [...existingSummaries, newSummary];
      setSummaryList(updatedSummaries);
      setSummaryIndex(updatedSummaries.length - 1);
      localStorage.setItem(currentKey, JSON.stringify(updatedSummaries));
    } catch (err) {
      toast.error("Failed to summarize the answer");
      console.error(err);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Rephrased answers states
  const [rephrasedList, setRephrasedList] = useState([]); // Will store 3 rephrased answers (one per style)
  const [rephraseIndex, setRephraseIndex] = useState(0); // Current page index of rephrased answer
  const [rephraseLoading, setRephraseLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("0");

  // Rephrasing styles and labels
  const getStyleLabel = (styleNum) => {
    switch (styleNum) {
      case 1: return "Simple language";
      case 2: return "Include Analogy";
      case 3: return "Include Examples";
      default: return "Unknown style";
    }
  };
  // Local storage key helper for rephrased answers
  const getRephrasedKey = (unit, index) => `rephrasedList_u${unit}_q${index}`;


  const handleRephrase = async (e) => {
    const style = parseInt(e.target.value);
    setSelectedStyle(style);
    if (style === "0") return;
    // Scroll to rephraser section
    if (rephraserRef.current) {
      const navbarOffset = 140;
      const rephraserPosition = rephraserRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: rephraserPosition - navbarOffset, behavior: "smooth" });
    }


    if (!summaryList[0] || !answer) {
      toast.error("Please summarize the answer first.");
      setSelectedStyle("0");
      return;
    }

    // Check if already generated for this style
    if (rephrasedList.some(item => item.style === style)) {
      // Just switch to that rephrased answer in the pagination
      const idx = rephrasedList.findIndex(item => item.style === style);
      setRephraseIndex(idx);
      setSelectedStyle("0");
      return;
    }

    toast.info("Rephrasing...");
    setRephraseLoading(true);

    try {
      const rephrased = await rephraseAnswer(style, summaryList[0], answer);
      const updatedList = [...rephrasedList, { style, answer: rephrased }];
      setRephrasedList(updatedList);
      setRephraseIndex(updatedList.length - 1);
      localStorage.setItem(getRephrasedKey(selectedUnit, selectedQuestion), JSON.stringify(updatedList));
      toast.success("Rephrased successfully.");
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
    if (rephraseIndex < rephrasedList.length - 1) setRephraseIndex(rephraseIndex + 1);
  };

  const question = qList[selectedUnit - 1]?.[selectedQuestion]?.question;
  const answer = qList[selectedUnit - 1]?.[selectedQuestion]?.solution;

  useEffect(() => {
    const saved = localStorage.getItem(getSummaryKey(selectedUnit, selectedQuestion));
    if (saved) {
      const parsed = JSON.parse(saved);
      setSummaryList(parsed);
      setSummaryIndex(0);
    } else {
      setSummaryList([]);
      setSummaryIndex(0);
    }
  }, [question, selectedUnit, selectedQuestion]);

  // Load saved rephrased answers from localStorage on question/unit/selectedQuestion change
  useEffect(() => {
    const saved = localStorage.getItem(getRephrasedKey(selectedUnit, selectedQuestion));
    if (saved) {
      setRephrasedList(JSON.parse(saved));
      setRephraseIndex(0);
    } else {
      setRephrasedList([]);
      setRephraseIndex(0);
    }
  }, [selectedUnit, selectedQuestion]);


  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      themeVariables: {
        nodePadding: 10,  // Increase padding
        nodeMinWidth: 10, // Set minimum node width
        nodeMinHeight: 10, // Set minimum node height
        fontSize: '14px',  // Adjust font size
      }
    });

    if (containerRef.current) {
      console.log('ContainerRef is: ', containerRef);
      console.log('ContainerRef.current is: ', containerRef.current);
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
        .replace(/<pre[^>]*>/g, '')  // Remove <pre> tag
        .replace(/<\/pre>/g, '')     // Remove </pre> tag
        .replace(/<code[^>]*>/g, '') // Remove <code> tag
        .replace(/<\/code>/g, '');   // Remove </code> tag
    };
    let parts = [];
    parts = rawContent.split(/\\`\\`\\`(mermaid|code)([\s\S]*?)\\`\\`\\`/g);
    console.log("Parts:", parts);

    return (
      <div className="rendered-content"> {/* Wrapper with custom class */}
        {parts.map((part, index) => {
          if (index % 3 === 0) {
            // Regular text content
            return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
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
      <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />
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


          {/* AI Utility Buttons */}
          <div className="ai-buttons">
            <button
              className="ai-btn summarizer-btn"
              onClick={handleSummarize}
            >
              {summaryLoading ? "Summarizing..." : "Summarizer"}
            </button>
            <div className="rephraser-container">
              <select
                className="ai-btn rephraser-select"
                onChange={handleRephrase}
                value={selectedStyle}
              >
                <option value="0" >
                  Rephraser
                </option>
                <option value="1">Simple language</option>
                <option value="2">Include Analogy</option>
                <option value="3">Include Examples</option>
              </select>
            </div>
          </div>



          {/* to be applied when filtering logic ready */}
          {/* <select name="" class="book-dashboard-dropdown common-css-dropdown">
            <option value="none">None</option>
            <option value="option1">Most Repeated</option>
            <option value="option2">Least Repeated</option>
          </select> */}
        </div>
        <div className="book-dashboard-question-summary-container">
          {qnaLoading
            ? (
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
              height: "50vh" // full viewport height, adjust if needed
            }}>
              <Lottie
                animationData={ManHoldingNotes}
                loop={true}
                style={{ height: 120, width: 120 }}
              />
              <p className="loader-text">
                Preparing your Questions and Answers...
              </p>
              

            </div>
            )
            : qnaError
              ? (<div>Error loading Q&A data. Please contact support team or raise a query!</div>)
              : question
                ? (
                  <div className="QnA">
                    <div className="book-dashboard-question">
                      Question:
                      {parse(question)}
                    </div>

                    <div className="book-dashboard-answer">
                      <div key={`answer_${selectedUnit}_${selectedQuestion}`} ref={containerRef}>
                        {renderContent(answer)}
                      </div>
                    </div>
                  </div>
                )
                : (<div>Data will be available soon!</div>)
          }


          {/* SUMMARY */}
          <div className="book-dashboard-summary" ref={summaryRef} >Summary of this question</div>
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
                      onClick={() => setSummaryIndex((prev) => Math.max(prev - 1, 0))}
                    >
                      ◀
                    </div>
                    <span>
                      {summaryIndex + 1} of {summaryList.length}
                    </span>
                    <div
                      disabled={summaryIndex === summaryList.length - 1}
                      onClick={() => setSummaryIndex((prev) => Math.min(prev + 1, summaryList.length - 1))}
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
          <div className="book-dashboard-summary" ref={rephraserRef} >Rephrased answer</div>
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
                      {rephraseIndex + 1} / {rephrasedList.length} : {getStyleLabel(rephrasedList[rephraseIndex].style)}
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
    </div>
  );
}

export default BookDashboardMidSec;
