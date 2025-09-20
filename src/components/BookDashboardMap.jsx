import React from "react";
import "./BookDashboardMap.css";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardLeftPieChart from "./BookDashboardLeftPieChart";
import BookDashboardRightPieChart from "./BookDashboardRightPieChart";

const content = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
  },
  {
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];
function BookDashboardMap({ currentSection, handleSectionChange }) {
  

  return (
    <div className="book-dashboard-insight-analytics">
      <div className="roadmap-navbar">
      <BookDashboardNavbar 
      currentSection={currentSection} 
      handleSectionChange={handleSectionChange} 
      
      />
      </div>


      {/* CONTENT */}
      <div className="book-dashboard-analytics">
        <div className="book-dashboard-analytics-question">
          Unit: Road-Map
        </div>
        {
          content.map((item, index) => (
            <div className="book-dashboard-analytics-answer book-dashboard-analytics-mid-answer">
              <div className="book-dashboard-analytics-answer-title">
                {item.title}
              </div>
              {item.content}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default BookDashboardMap;
