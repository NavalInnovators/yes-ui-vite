import { Outlet } from "react-router-dom";

import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";
import ReviewerAnalyticsMobile from "./new_qna_componennts/ReviewerAnalyticsMobile";
import ViewQNA from "./new_qna_componennts/ViewQNA";
import useSmallScreen from "../../../components/custom_hooks/useSmallScreen";

export default function NewQNA() {
  const smallScreen = useSmallScreen();

  return (
    <div
      className={`flex ${smallScreen && "flex-col"} gap-[15px] justify-between`}
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
