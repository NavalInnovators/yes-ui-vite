import React from "react";
// import BookDashboardResponsiveUnitDropdown from "./BookDashboardResponsiveUnitDropdown";
// import BookDashboardResponsiveTopicsDropdown from "./BookDashboardResponsiveTopicsDropdown";
// import LeftPageArrow from "../assets/LeftPageArrow.svg";
import RightPageArrow from "../assets/RightPageArrow.svg";
import BookDashboardNavbar from "./BookDashboardNavbar";
import "./BookDashboardSyllabus.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import { DataAvailableSoon, NoData } from "./EmptyStates";
import { SyllabusSkeletonLoader } from "./BookDashboardSkeletons";

export default function BookDashboardSyllabus({
    currentSection,
    handleSectionChange,
}) {
    const { selectedUnit, syllabusLoading, syllabusError, syllabus } =
        useBookDashboard();

    // Error and loading handling
    // if (syllabusLoading) {
    //   return <div>Loading syllabus...</div>;
    // }
    // if (syllabusError) {
    //   return <div>Error loading syllabus. Please contact support team or raise a query!</div>;
    // }

    const syllabusContent = syllabus?.units?.[selectedUnit - 1]?.topics || [];

    return (
        <div className="bookdashboard-syllabus-mid-section">
            <div className="book-dashboard-syllabus-container">
                <BookDashboardNavbar
                    currentSection={currentSection}
                    handleSectionChange={handleSectionChange}
                />
                <div className="book-dashboard-syllabus-sec">
                    {syllabusLoading ? (
                        <SyllabusSkeletonLoader />
                    ) : syllabusError ? (
                        <div className="flex items-center justify-center">
                            <NoData
                                title="Error Loading Syllabus"
                                message="Error loading syllabus. Please contact support team or raise a query!"
                            />
                        </div>
                    ) : syllabus?.units?.[selectedUnit - 1] ? (
                        <>
                            <div className="syllabus-title">
                                {syllabus?.units?.[selectedUnit - 1]?.unitTitle}
                            </div>
                            <div className="book-dashboard-syllabus-sec-container">
                                <div className="syllabus-content">
                                    {syllabusContent.length === 0 ? (
                                        <DataAvailableSoon
                                            title="No Topics Available"
                                            message="Topics for this unit will be available soon."
                                            className="py-8"
                                        />
                                    ) : (
                                        syllabusContent.map(
                                            (content, index) => (
                                                <div
                                                    className="syllabus"
                                                    style={{
                                                        borderBottom:
                                                            index ===
                                                                syllabusContent.length -
                                                                    1 && "none",
                                                    }}
                                                    key={index}
                                                >
                                                    {content}
                                                </div>
                                            ),
                                        )
                                    )}
                                </div>
                                {/* The below commented section could be used to display syllabus in table format */}
                                {/* <div className="syllabus-table-container">
              {syllabus.map((row, i) => (
                <div className="syllabus-table-row" key={i}>
                  {row.map((cell, j) => (
                    <div className="syllabus-table-cell" style={{ fontWeight: i === 0 && "bold" }} key={j}>{cell}</div>
                  ))}
                </div>
              ))}
            </div> */}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center">
                            <DataAvailableSoon
                                title="Syllabus Coming Soon"
                                message="Syllabus data will be available soon!"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
