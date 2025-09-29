import React, { useEffect } from "react";
import "./BookDashboardRightSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";

function removeHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

function truncateText(text, maxLength = 20) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function BookDashboardRightSec() {
  const { qnaLoading, selectedQuestion, setSelectedQuestion, filteredQnAQuestions, selectedQnATopic } = useBookDashboard();

  // Use filtered questions from context
  const questions = filteredQnAQuestions || [];

  useEffect(() => {
    if (!qnaLoading && questions.length > 0 && selectedQuestion == null) {
      setSelectedQuestion(0);
    }
  }, [qnaLoading, questions, selectedQuestion, setSelectedQuestion]);

  return (
    <div className="book-dashboard-right-sec">
      {/** Desktop View */}
      <div className="topics-not-dropdown">
        <div className="book-dashboard-topics">
          {!qnaLoading && (
            <>
            <div className="all-topics">All Questions</div>
            <ol>
              {questions.map((topic, index) => (
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
