import React from "react";
import "./BookDashboardProgressBar.css";
import { useSearchParams } from "react-router-dom";

function BookDashboardProgressBar({
  defaultUniversityName = "University Name",
  defaultCourseCodes = ["Course Code"],
  defaultYear = "Year",
  defaultBookName = "Name of book",
}) {
  const [searchParams] = useSearchParams();
  const subcode = searchParams.get("subcode");

  // Safely get and parse localStorage data
  const getBookDetails = () => {
    try {
      const storedDetails = localStorage.getItem("bookDetails");
      if (!storedDetails) {
        console.warn("No book details found in localStorage");
        return null;
      }

      const parsedDetails = JSON.parse(storedDetails);
      // Access the specific subject code data
      if (!parsedDetails[subcode]) {
        console.warn(`No details found for subject code: ${subcode}`);
        return null;
      }
      return parsedDetails[subcode];
    } catch (error) {
      console.error("Error parsing book details from localStorage:", error);
      return null;
    }
  };

  const bookDetails = getBookDetails();

  // Safely access properties with fallbacks
  const universityName =
    bookDetails?.universityName != "Unknown"
      ? bookDetails?.universityName
      : "" || defaultUniversityName;
  const branchNames = bookDetails?.branchNames || defaultCourseCodes;
  const year = bookDetails?.year ? `Year ${bookDetails.year}` : defaultYear;
  const name = bookDetails?.name || defaultBookName;

  return (
    <div className="header-progress-bar">
      <div className="left-sec-progress-bar">
        <div className="book-name" title={name}>
          {name}
        </div>
        <div className="book-details">
          {universityName && <div title={universityName}>{universityName}</div>}
          {branchNames.length > 0 && (
            <div title={branchNames.join(" | ")}>{branchNames.join(" | ")}</div>
          )}
          {year && <div title={year}>{year}</div>}
        </div>
      </div>
    </div>
  );
}

export default BookDashboardProgressBar;
