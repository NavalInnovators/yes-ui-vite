import React, { useState } from "react";
import "./BookDashboardInsightAnalyticsMidSec.css";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardInsightPredictionTable from "./BookDashboardInsightPredictionTable";
import BookDashboardUnitsResponsiveUnitDropdown from "./BookDashboardUnitsResponsiveUnitDropdown";
import BookDashboardLeftPieChart from "./BookDashboardLeftPieChart";
import BookDashboardRightPieChart from "./BookDashboardRightPieChart";
// import { PiechartLeft, PiechartRight } from "../assets";

function BookDashboardInsightAnalyticsMidSec({ currentSection, handleSectionChange }) {
  // State to track which tab is selected
  const [isPrediction, setIsPrediction] = useState(false);

  // Toggle function to switch between Analytics and Prediction
  const handleToggle = (tab) => {
    setIsPrediction(tab === "Prediction");
  };

  return (
    <div className="book-dashboard-insight-analytics">
      <div className="for-small-screens">
        <BookDashboardUnitsResponsiveUnitDropdown />
      </div>
      <hr />
      <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />

      {/* TOGGLE BAR */}
      <ul className="book-dashboard-toggle-bar">
        <div
          id="left-toggle-bar"
          onClick={() => handleToggle("Analytics")}
          className={!isPrediction ? "active" : ""}
        >
          Analytics
        </div>
        <div
          id="right-toggle-bar"
          onClick={() => handleToggle("Prediction")}
          className={isPrediction ? "active" : ""}
        >
          Prediction
        </div>
      </ul>

      {/* CONTENT */}
      <div className="book-dashboard-analytics">
        <div className="book-dashboard-analytics-question">
          Topic: Mind Maps
        </div>

        {/* Conditionally render BookDashboardInsightPredictionTable based on toggle */}
        {isPrediction && <BookDashboardInsightPredictionTable />}

        <div className="book-dashboard-piecharts">
          <div className="left-pie common-pie-chart">
            <BookDashboardLeftPieChart />
            {/* <img src={PiechartLeft} alt="piechart" /> */}
          </div>
          <div className="right-pie common-pie-chart">
            <BookDashboardRightPieChart />

            {/* <img src={PiechartRight} alt="" /> */}
          </div>
        </div>
        <div className="book-dashboard-analytics-answer book-dashboard-analytics-mid-answer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </div>
        <div className="book-dashboard-analytics-answer">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum p
        </div>
      </div>
    </div>
  );
}

export default BookDashboardInsightAnalyticsMidSec;
