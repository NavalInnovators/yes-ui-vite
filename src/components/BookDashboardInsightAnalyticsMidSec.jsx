import React, { useState } from "react";
import "./BookDashboardInsightAnalyticsMidSec.css";
import BookDashboardNavbar from "./BookDashboardNavbar";
import BookDashboardInsightPredictionTable from "./BookDashboardInsightPredictionTable";
import BookDashboardUnitsResponsiveUnitDropdown from "./BookDashboardUnitsResponsiveUnitDropdown";
import BookDashboardLeftPieChart from "./BookDashboardLeftPieChart";
import BookDashboardRightPieChart from "./BookDashboardRightPieChart";
import { useBookDashboard } from "../context/book-dashboard-context";
import { useCart } from "../context/CartContext";
import "./BookDashboardUnitMidSec.css";
import BookDashboardBarGraph from "./BookDashboardBarGraph";
import { findCourseByCode } from "../utils/courseUtils";
import { DataAvailableSoon, NoData } from "./EmptyStates";
import { InsightsSkeletonLoader } from "./BookDashboardSkeletons";

function BookDashboardInsightAnalyticsMidSec({
    currentSection,
    handleSectionChange,
}) {
    const {
        selectedUnit,
        insightsLoading,
        insightsError,
        unitInsights,
        subCode,
    } = useBookDashboard();
    const { checkFeatureAccess } = useCart();

    const [isPrediction, setIsPrediction] = useState(false);
    const handleToggle = (tab) => {
        setIsPrediction(tab === "Prediction");
    };
    const [selectedUnit2, setSelectedUnit] = useState(1);

    // Get current course for access control
    const getCurrentCourse = () => findCourseByCode(subCode);

    // Check access before displaying content
    const currentCourse = getCurrentCourse();
    const unitNumber = parseInt(selectedUnit);
    const hasAccess = currentCourse
        ? checkFeatureAccess(currentCourse.id, "Insights", unitNumber)
        : false;

    const useUnitTitle = unitInsights[selectedUnit]?.unitTitle;
    const useTopicFrequency = unitInsights[selectedUnit]?.topicfrequency;
    const useQuestionTypeData = unitInsights[selectedUnit]?.questiontypedata;

    return (
        // <div className="book-dashboard-insight-analytics">
        <div className="parent-book-dashboard-unit">
            {/* For Small Screens Unit Dropdown */}
            {/* <div className="for-small-screens"> */}
            {/* <BookDashboardUnitsResponsiveUnitDropdown selectedUnit2={selectedUnit2}
          setSelectedUnit={setSelectedUnit} /> */}
            {/* </div> */}

            {/* <hr /> */}

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
            {hasAccess === false ? (
                <div
                    className="access-denied-message"
                    style={{
                        padding: "2rem",
                        textAlign: "center",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        borderRadius: "8px",
                        margin: "1rem",
                    }}
                >
                    <h3 style={{ color: "#6c757d", marginBottom: "1rem" }}>
                        🔒 Premium Content
                    </h3>
                    <p style={{ color: "#6c757d" }}>
                        You need a Basic or Pro plan to access Unit{" "}
                        {selectedUnit} insights. Free users can only access Unit
                        1 insights.
                    </p>
                </div>
            ) : insightsLoading ? (
                <InsightsSkeletonLoader />
            ) : insightsError ? (
                <div className="flex items-center justify-center">
                    <NoData
                        title="Error Loading Insights"
                        message="Failed to load insights data. Please try refreshing the page or check your connection."
                    />
                </div>
            ) : !useUnitTitle && !useTopicFrequency && !useQuestionTypeData ? (
                <div className="flex items-center justify-center">
                    <DataAvailableSoon
                        title="Insights Coming Soon"
                        message="Insights data for this unit will be available soon. We're working hard to analyze the content for you!"
                    />
                </div>
            ) : (useTopicFrequency && useTopicFrequency.length > 0) ||
              (useQuestionTypeData &&
                  Object.keys(useQuestionTypeData).length > 0) ? (
                <div className="book-dashboard-analytics">
                    {/* TOPIC BOX */}
                    <div className="md: w-full flex justify-center items-center rounded-t-lg h-16  bg-gray-100 ">
                        Unit {selectedUnit} -{" "}
                        {useUnitTitle ? (
                            <div> {useUnitTitle}</div>
                        ) : (
                            <div> Unit {selectedUnit}</div>
                        )}
                    </div>

                    {/* TWO COLUMN LAYOUT */}
                    <div className="my-4 md:width-full bg-gray-100 px-3 py-2 ">
                        <BookDashboardBarGraph
                            useTopicFrequency={useTopicFrequency}
                            selectedUnit={selectedUnit}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 !mt-4 max-w-[1000px] mx-auto">
                        {/* LEFT COLUMN */}
                        <div className="flex flex-col w-full md:w-[100%] gap-4  ">
                            {/* Upper Left */}
                            {/* <div className="h-auto p-4 rounded-md flex  shadow-sm justify-center bg-gray-100"> */}
                            <BookDashboardLeftPieChart
                                selectedUnit={selectedUnit}
                                useQuestionTypeData={useQuestionTypeData}
                            />
                            {/* </div> */}

                            {/* Lower Left */}
                            <div className="h-full  p-4  md:!mb-40 bg-gray-100 shadow-sm overflow-x-auto">
                                <BookDashboardInsightPredictionTable
                                    useUnitTitle={useUnitTitle}
                                    useTopicFrequency={useTopicFrequency}
                                    selectedUnit={selectedUnit}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        {/* <div className="flex-1  h-full p-4 w-full  md:max-w-[40%] overflow-x-auto bg-gray-100 shadow-sm">

            {/* <BookDashboardRightPieChart useTopicFrequency={useTopicFrequency} selectedUnit={selectedUnit} /> */}
                        {/* <div className="text-center mt-4">
              <p className="text-gray-700 mb-3">
                Click and find the answer on topic page
              </p>
              <button
                className="rounded-md border-2 bg-[#792AAF] text-white !px-7 !py-2 !mb-4 text-base cursor-pointer hover:bg-[#5e1f87] transition-all duration-200"
              >
                Go To Topic
              </button>
            </div> */}

                        {/* </div>  */}
                    </div>

                    {/* Render full-width table if in Prediction mode only */}
                    {/* {isPrediction && (
            <div className="mt-4">
              <BookDashboardInsightPredictionTable subcode="khu702" selectedUnit2={selectedUnit2} />
            </div>
          )} */}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <DataAvailableSoon
                        title="Insights Coming Soon"
                        message="Insights data for this unit will be available soon. We're working hard to analyze the content for you!"
                    />
                </div>
            )}
        </div>
    );
}

export default BookDashboardInsightAnalyticsMidSec;
