import React, { useEffect } from "react";
import "./BookDashboardRightSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";

function removeHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

function BookDashboardRightSec() {
  const {
    qnaLoading,
    qList,
    selectedUnit,
    selectedQuestion,
    setSelectedQuestion,
  } = useBookDashboard(); // Adjust to match your context keys.

  // Safely parse selectedUnit to ensure valid indexing.
  const unitIndex = parseInt(selectedUnit, 10) - 1;
  const questions = qList[unitIndex] || [];

  useEffect(() => {
    if (!qnaLoading && questions.length > 0 && selectedQuestion == null) {
      setSelectedQuestion(0);
    }
  }, [qnaLoading, questions, selectedQuestion, setSelectedQuestion]);

  return (
    <div className="book-dashboard-right-sec">
      {/** Desktop View */}
      <div className="topics-not-dropdown">
        <div className="book-dashboard-topics" id="questions">
          {!qnaLoading && (
            <>
              <div className="all-topics">All Questions</div>
              <ol>
                {questions.map((topic, index) => (
                  <li
                    className={
                      selectedQuestion === index ? "selected-question" : ""
                    }
                    key={index}
                    onClick={() => setSelectedQuestion(index)}
                  >
                    {removeHtmlTags(topic.question)}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>

        {/* <div className="book-dashboard-topics">

          {qnaLoading ? (
            <></>
            // <div>Loading...</div>
          ) : (
            <>
              <div className="all-topics">All Questions</div>
              <ol>
                {qList[unitIndex]?.map((topic, index) => (
                  <li
                    className={selectedQuestion === index ? "selected-question" : ""}
                    key={index}
                    onClick={() => setSelectedQuestion(index)}
                  >
                    {removeHtmlTags(topic.question)}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div> */}
      </div>

      {/** Mobile View */}
      <div className="mobile-question-dropdown">
        {!qnaLoading && questions.length > 0 && (
          <select
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(Number(e.target.value))}
          >
            {questions.map((topic, index) => (
              <option key={index} value={index}>
                Question {index + 1}: {removeHtmlTags(topic.question)}
                {/* Question {index+1} */}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default BookDashboardRightSec;
