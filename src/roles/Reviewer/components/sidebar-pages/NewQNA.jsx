import { Outlet } from "react-router-dom";
import { motion } from "motion/react";

import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";
import ReviewerAnalyticsMobile from "./new_qna_componennts/ReviewerAnalyticsMobile";
import ViewQNA from "./new_qna_componennts/ViewQNA";
import { useState } from "react";

export default function NewQNA() {
  const [smallScreen, setSmallScreen] = useState(true);

  return (
    <div
      className={`flex ${smallScreen && "flex-col"} gap-[15px] justify-between`}
    >
      {smallScreen && <ReviewerAnalyticsMobile showReviewed={false} />}
      <ViewQNA />
      {!smallScreen && <ReviewerAnalytics showReviewed={false} />}

      {/* Draft Page */}
      <Outlet />
    </div>
  );
}
