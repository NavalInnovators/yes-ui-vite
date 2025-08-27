import ReviewedQNALeft from "./reviewed_qna_components/ReviewedQNALeft";
import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";
import ReviewerAnalyticsMobile from "./new_qna_componennts/ReviewerAnalyticsMobile";
import { useContext } from "react";
import WindowWidthContext from "../../context/WindowWidthContext";

export default function ReviewedQNA() {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 1020;
  // If you need is800px logic, add:
  const is800px = windowWidth < 800;

  return (
    <div
      className={`flex gap-[15px] justify-between ${
        isSmallScreen && "flex-col"
      }`}
    >
      {isSmallScreen && <ReviewerAnalyticsMobile showReviewed={true} />}

      <ReviewedQNALeft />

      {!isSmallScreen && <ReviewerAnalytics showReviewed={true} />}
    </div>
  );
}
