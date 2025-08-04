import ReviewedQNALeft from "./reviewed_qna_components/ReviewedQNALeft";
import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";
import ReviewerAnalyticsMobile from "./new_qna_componennts/ReviewerAnalyticsMobile";
import useSmallScreen from "../../../components/custom_hooks/useSmallScreen";

export default function ReviewedQNA() {
  const isSmallScreen = useSmallScreen(1020);

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
