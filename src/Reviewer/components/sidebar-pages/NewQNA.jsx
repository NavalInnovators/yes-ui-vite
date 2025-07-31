import ReviewerAnalytics from "./new_qna_componennts/ReviewerAnalytics";
import ViewQNA from "./new_qna_componennts/ViewQNA";

export default function NewQNA() {
  return (
    <div className="flex gap-[20px] justify-between">
      <ViewQNA />
      <ReviewerAnalytics showReviewed={false} />
    </div>
  );
}
