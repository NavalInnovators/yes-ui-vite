import React from "react";
import "./BookDashboardMap.css";
import BookDashboardNavbar from "./BookDashboardNavbar";
// import BookDashboardInsightPredictionTable from "./BookDashboardInsightPredictionTable";
import BookDashboardUnitsResponsiveUnitDropdown from "./BookDashboardUnitsResponsiveUnitDropdown";
import BookDashboardLeftPieChart from "./BookDashboardLeftPieChart";
import BookDashboardRightPieChart from "./BookDashboardRightPieChart";

const content = [
  {
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
      <div className="for-small-screens">
        <BookDashboardUnitsResponsiveUnitDropdown />
      </div>
      <hr />
      <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />


      {/* CONTENT */}
      <div className="book-dashboard-analytics">
        <div className="book-dashboard-analytics-question">
          Topic: Mind Maps
        </div>


        <div className="book-dashboard-piecharts">
          <div className="left-pie common-pie-chart">
            <BookDashboardLeftPieChart />
          </div>
          <div className="right-pie common-pie-chart">
            <BookDashboardRightPieChart />
          </div>
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
