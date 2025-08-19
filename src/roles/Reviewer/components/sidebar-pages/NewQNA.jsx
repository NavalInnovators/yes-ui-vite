import { Outlet } from "react-router-dom";

import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";
import ReviewerAnalyticsMobile from "./new_qna_componennts/ReviewerAnalyticsMobile";
import ViewQNA from "./new_qna_componennts/ViewQNA";
import { useContext } from "react";
import WindowWidthContext from "../../context/WindowWidthContext";

export default function NewQNA() {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 1020;

  return (
    <div
      className={`flex ${
        smallScreen ? "flex-col" : ""
      } justify-between gap-[15px]`}
    >
      {/* Reviewer Analytics for Mobile Screens */}
      {smallScreen && <ReviewerAnalyticsMobile />}

      <ViewQNA />

      {/* Reviewer Analytics for Desktop Screens */}
      {!smallScreen && <ReviewerAnalytics />}

      {/* Draft Page */}
      <Outlet />
    </div>
  );
}
