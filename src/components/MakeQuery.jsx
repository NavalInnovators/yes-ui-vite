import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSubjects, postQuery } from "../api/api";
import { trackQuerySubmitted } from "../utils/analytics";
// import { hat } from "../assets";
import "./SubmitQueryProfile.css";

const profileId = localStorage.getItem("profileId");

const MakeQuery = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [queryText, setQueryText] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Fetch subjects with useQuery
  const {
    data: subjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subjects", profileId],
    queryFn: () => fetchSubjects(profileId),
  });

  const { mutate, status } = useMutation({
    mutationFn: postQuery,
    onSuccess: () => {
      // Track query submission
      const selectedSubject = subjects?.find(
        (s) => s.id === parseInt(selectedSubjectId),
      );
      trackQuerySubmitted({
        subject: selectedSubject?.name || "Unknown",
        query: queryText,
      });

      toast.success("Query submitted successfully!");
      setQueryText("");
      setSelectedSubjectId("");
      setMsg({ type: "success", text: "Query submitted successfully!" });
    },
    onError: () => {
      toast.error("Failed to submit query.");
      setMsg({
        type: "error",
        text: "Failed to submit query. Please try again.",
      });
    },
  });

  const handleUpload = () => {
    if (!selectedSubjectId.trim() || !queryText.trim()) {
      setMsg({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const fd = new FormData();
    fd.append("query", queryText);
    fd.append("courseId", selectedSubjectId);
    fd.append("profileId", profileId);

    mutate(fd);
  };

  return (
    <div className="review-section submit-your-query-form-cont">
      <ToastContainer />
      <div className="review-section-heading">Submit a Query!</div>
      <div className="review-section-paragraph">
        We will get back to you as soon as possible!
      </div>

      <form className="make-query-form font-paragraph-black-light">
        <div className="profile-sec-full-cell make-query-dropdown">
          <select
            name="subject"
            value={selectedSubjectId}
            onChange={(e) => {
              const subjectId = e.target.value;
              setSelectedSubjectId(subjectId);
            }}
            className="edit-profile-sec-select edit-edu-sec-select"
          >
            <option value="">Select a subject</option>
            {isLoading && <option disabled>Loading...</option>}
            {error && <option disabled>Failed to load subjects</option>}
            {!isLoading &&
              subjects?.map((subject, index) => (
                <option key={index} value={subject.id}>
                  {subject.name}
                </option>
              ))}
          </select>
        </div>

        <textarea
          id="query"
          name="query"
          className="review-sec-text-area"
          placeholder="Describe your query..."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          required
        ></textarea>
      </form>

      {msg.type === "error" && <div className="error-message">{msg.text}</div>}

      <button
        className="review-sec-submit-btn review-sec-submit-btn colourful-border-btn"
        onClick={handleUpload}
        disabled={status === "pending"}
      >
        {status === "pending" ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default MakeQuery;
