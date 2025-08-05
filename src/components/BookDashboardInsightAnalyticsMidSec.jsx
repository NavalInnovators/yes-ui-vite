import React, { useState } from "react";
import "./BookDashboardInsightAnalyticsMidSec.css";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardInsightPredictionTable from "./BookDashboardInsightPredictionTable";
import BookDashboardUnitsResponsiveUnitDropdown from "./BookDashboardUnitsResponsiveUnitDropdown";
import BookDashboardLeftPieChart from "./BookDashboardLeftPieChart";
import BookDashboardRightPieChart from "./BookDashboardRightPieChart";
 import { getAnalyticData } from "../api/api";

function BookDashboardInsightAnalyticsMidSec({ currentSection, handleSectionChange }) {
  const [isPrediction, setIsPrediction] = useState(false);
   const subcode = sessionStorage.getItem('courseCode');
  const handleToggle = (tab) => {
    setIsPrediction(tab === "Prediction");
  };

  const [selectedUnit, setSelectedUnit] = useState(1);

 

  return (
    // <div className="book-dashboard-insight-analytics">
    <div>
      {/* For Small Screens Unit Dropdown */}
      <div className="for-small-screens">
        <BookDashboardUnitsResponsiveUnitDropdown selectedUnit={selectedUnit}
  setSelectedUnit={setSelectedUnit} />
      </div>

      <hr />

      {/* Navbar */}
      <BookDashboardNavbar
        currentSection={currentSection}
        handleSectionChange={handleSectionChange}
      />

      {/* TOGGLE BAR */}
      {/* <ul className="book-dashboard-toggle-bar">
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
      </ul> */}

      {/* MAIN CONTENT */}
      <div className="book-dashboard-analytics">
        {/* TOPIC BOX */}
        <div className="md:w-[1000px] w-full mx-auto flex justify-center items-center rounded-t-lg h-16  bg-gray-100 ">
          Topic: These analytics graphs are based on Unit 1
        </div>
       

        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-4 !mt-4 max-w-[1000px] mx-auto">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full md:w-[60%] gap-4  p-2 ">
            {/* Upper Left */}
            {/* <div className="h-auto p-4 rounded-md flex  shadow-sm justify-center bg-gray-100"> */}
  <BookDashboardLeftPieChart subcode="khu702" selectedUnit={selectedUnit} />
{/* </div> */}



            {/* Lower Left */}
            <div className="h-full border p-4 mx-2 md:!mb-40 bg-gray-100 shadow-sm overflow-x-auto">
              <BookDashboardInsightPredictionTable subcode="khu702"  selectedUnit={selectedUnit}/>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1  h-full p-4 w-full  md:max-w-[40%] overflow-x-auto bg-gray-100 shadow-sm">

            <BookDashboardRightPieChart subcode="khu702" selectedUnit={selectedUnit}/>
            <div className="text-center mt-4">
              <p className="text-gray-700 mb-3">
                Click and find the answer on topic page
              </p>
              <button
                className="rounded-md border-2 bg-[#792AAF] text-white !px-7 !py-2 !mb-4 text-base cursor-pointer hover:bg-[#5e1f87] transition-all duration-200"
              >
                Go To Topic
              </button>
            </div>




          </div>
        </div>

        {/* Render full-width table if in Prediction mode only */}
        {isPrediction && (
          <div className="mt-4">
            <BookDashboardInsightPredictionTable subcode="khu702" selectedUnit={selectedUnit} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDashboardInsightAnalyticsMidSec;
