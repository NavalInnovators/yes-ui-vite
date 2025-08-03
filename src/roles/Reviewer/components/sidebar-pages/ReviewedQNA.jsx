import ReviewedQNALeft from "./reviewed_qna_components/ReviewedQNALeft";
import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";

export default function ReviewedQNA() {
  return (
    <div className="h-[calc(100vh-77.5px-74px-40px)] flex gap-[20px] justify-between">
      <ReviewedQNALeft />
      <ReviewerAnalytics showReviewed={true} />
    </div>
  );
}
