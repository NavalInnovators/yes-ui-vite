import { useQuery } from "@tanstack/react-query"; // ADDING useQuery HOOK
import { CommentIcon, LikeIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { fetchQueries, fetchSubjects } from "../api/api"; // IMPORTING fetchQueries AND fetchSubjects

const profileId = localStorage.getItem("profileId");
// const profileId = localStorage.getItem("profileId");

const YourQuery = () => {
  const navigate = useNavigate();

  // FETCHING QUERIES FOR A PROFILE
  const {
    data: queries,
    isLoading: isQueriesLoading,
    error: queriesError,
  } = useQuery({
    queryKey: ["queries", profileId],
    queryFn: () => fetchQueries(profileId),
  });

  // FETCHING SUBJECTS TO GET COURSE NAMES
  const {
    data: subjects,
    isLoading: isSubjectsLoading,
    error: subjectsError,
  } = useQuery({
    queryKey: ["subjects", profileId],
    queryFn: () => fetchSubjects(profileId),
  });

  // HANDLE LOADING AND ERROR STATES
  if (isQueriesLoading || isSubjectsLoading) return <div>Loading...</div>;
  if (queriesError || subjectsError)
    return (
      <div>
        Error loading data: {queriesError?.message || subjectsError?.message}
      </div>
    );

  // Map through the queries and find corresponding subject names
  const queriesWithSubjectNames = queries?.map((query) => {
    const subject = subjects?.find((subject) => subject.id === query.courseId);
    const subjectName = subject ? subject.name : "Unknown Subject";
    return { ...query, subjectName };
  });

  return (
    <div className="query-answer-card-container">
      {queriesWithSubjectNames?.map((query, index) => (
        <div
          key={index}
          className="query-answer-card"
          onClick={() => {
            navigate("/expanded-query", {
              state: {
                subjectName: query.subjectName,
                queryStatement: query.query,
                queryResolution: query.answer || "Not answered yet", // Default value if answer is null
              },
            });
          }}
        >
          <div className="query-answer-header-content">
            <div className="font-subheading-black query-answer-header-content-heading">{query.subjectName}</div>{" "}
            {/* Display subjectName */}
            <div className="font-notification query-answer-header-content-query">{query.query}</div>
          </div>
          <div>
            <div className="query-answer-card-footer">
              <div className="query-answer-card-footer-eachside font-notification">
                {query.submissionDate}
                {/* Assuming submissionDate is available */}
              </div>
              <div className="query-answer-card-footer-eachside query-answer-card-footer-img-cont">
                <img src={LikeIcon} alt="likeicon" />
                <img src={CommentIcon} alt="commenticon" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourQuery;
