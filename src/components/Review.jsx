import "./Review.css";
import React, { useState, 
  // useEffect 
} from "react";
import { 
  // star, 
  // AttachmentIcon 
} from "../assets";
import { useMutation } from "@tanstack/react-query";
import { postFeedback } from "../api/api.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const profileId = localStorage.getItem("profileId");
const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [files, setFiles] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const { mutate, status } = useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      toast.success("Feedback submitted successfully!");
      setFeedbackText("");
      setRating(0);
      setFiles(null);
      setMsg({ type: "success", text: "Feedback submitted successfully!" });
    },
    onError: () => {
      toast.error("Failed to submit feedback.");
      setMsg({
        type: "error",
        text: "Failed to submit feedback. Please try again.",
      });
    },
  });

  const handleUpload = () => {
    if (!feedbackText.trim() || rating === 0) {
      setMsg({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    const fd = new FormData();
    fd.append("starRating", rating);
    fd.append("feedback", feedbackText);
    fd.append("profileId", profileId);


    if (files) {
      for (let i = 0; i < files.length; i++) {
        fd.append(`file${i + 1}`, files[i]);
      }
    }

    mutate(fd);
  };

  return (
    <div className="review-container">
      <ToastContainer />
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">Review</div>
      </div>

      <div className="review-section">
        <div className="review-section-heading">Write a review!</div>
        <div className="review-section-paragraph">
          Your feedback is essential for our improvement. Please share any
          thoughts or suggestions you have.
        </div>

        <div className="review-sec-star-rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              className="review-sec-star-rating-btn"
              key={num}
              onClick={() => setRating(num)}
              onMouseOver={() => setHover(num)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={`review-sec-star ${
                  num <= (rating || hover) ? "ratingBtnOn" : "ratingBtnOff"
                }`}
              >
                &#9733;
              </span>
            </button>
          ))}
        </div>

        <textarea
          className="review-sec-text-area"
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>

        {/* Displaying status messages */}
        {msg.type === "error" && (
          <div className="error-message">{msg.text}</div>
        )}

        <button
          className="review-sec-submit-btn colourful-border-btn"
          onClick={handleUpload}
          disabled={status === "pending"}
        >
          {status === "pending" ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Review;
