import React, { useState } from "react";
import "./BookDashboardInsightAnalyticsMidSec.css";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardInsightPredictionTable from "./BookDashboardInsightPredictionTable";
import BookDashboardUnitsResponsiveUnitDropdown from "./BookDashboardUnitsResponsiveUnitDropdown";
import BookDashboardLeftPieChart from "./BookDashboardLeftPieChart";
import BookDashboardRightPieChart from "./BookDashboardRightPieChart";
import { useBookDashboard } from "../context/book-dashboard-context";
import "./BookDashboardUnitMidSec.css";
import BookDashboardBarGraph from "./BookDashboardBarGraph";



function BookDashboardInsightAnalyticsMidSec({ currentSection, handleSectionChange }) {
  const { selectedUnit, insightsLoading, insightsError, unitInsights } = useBookDashboard();

  const [isPrediction, setIsPrediction] = useState(false);
  const subcode = sessionStorage.getItem('courseCode');
  const handleToggle = (tab) => {
    setIsPrediction(tab === "Prediction");
  };
  const [selectedUnit2, setSelectedUnit] = useState(1);
  const useUnitTitle = unitInsights[selectedUnit]?.unitTitle;
  const useTopicFrequency = unitInsights[selectedUnit]?.topicfrequency;
  const useQuestionTypeData = unitInsights[selectedUnit]?.questiontypedata;

  return (
    <div className="parent-book-dashboard-unit">
      
      {/* Navbar */}
      <BookDashboardNavbar
        currentSection={currentSection}
        handleSectionChange={handleSectionChange}
      />

      {/* MAIN CONTENT */}
      <div className="book-dashboard-analytics">
        {/* TOPIC BOX */}
        <div className="md: w-full flex justify-center items-center rounded-t-lg h-16  bg-gray-100 ">
          Unit {selectedUnit} - {insightsLoading ? <div> Loading...</div> : insightsError ? <div> Error Loading !</div> : useUnitTitle ? <div> {useUnitTitle}</div> : <div> Data will be available soon</div>}
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="my-4 md:width-full bg-gray-100 px-3 py-2 ">
          <BookDashboardBarGraph useTopicFrequency={useTopicFrequency} selectedUnit={selectedUnit} />
        </div>
       
        <div className="flex flex-col md:flex-row gap-4 !mt-4 max-w-[1000px] mx-auto">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full md:w-[100%] gap-4  ">
            {/* Upper Left */}
            <BookDashboardLeftPieChart selectedUnit={selectedUnit} useQuestionTypeData={useQuestionTypeData} />

            {/* Lower Left */}
            <div className="h-full  p-4  md:!mb-40 bg-gray-100 shadow-sm overflow-x-auto">
              <BookDashboardInsightPredictionTable useUnitTitle={useUnitTitle} useTopicFrequency={useTopicFrequency} selectedUnit={selectedUnit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDashboardInsightAnalyticsMidSec;
