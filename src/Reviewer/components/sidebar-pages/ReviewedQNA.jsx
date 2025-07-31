import ReviewedQNALeft from "./reviewed_qna_components/ReviewedQNALeft";
import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";

export default function ReviewedQNA() {
  return (
    <div className="flex gap-[20px] justify-between">
      <ReviewedQNALeft />
      <ReviewerAnalytics showReviewed={true} />
    </div>
  );
}
