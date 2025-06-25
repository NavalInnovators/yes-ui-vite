import { useLocation } from "react-router-dom";
import "./SubmitQueryProfile.css";
import { LikeIcon } from "../assets";

const ExpandedQueryChat = ({
  subjectName = "Subject that student has doubt in",
  queryStatement = "Student's question statement",
  queryResolution = "Resolution provided by Your Exam Saathi",
}) => {
  const location = useLocation();

  // Override default props with props from clicked query card if available otherwise use default props
  const {
    subjectName: stateSubject,
    queryStatement: stateQuery,
    queryResolution: stateResolution,
  } = location.state || {};

  return (
    <div className="expanded-query-chat-container">
      <div className="expanded-query-details">
        <div className="first-full-cell font-subheading-black expanded-query-subject-name">
          Subject: {stateSubject || subjectName}{" "}
          {/* whichever is available will be displyed */}
        </div>
        <div className="last-full-cell font-paragraph-black-light expanded-query">
          {stateQuery || queryStatement}
        </div>
      </div>
      <div className="expanded-query-resolution font-paragraph-black-light">
        {stateResolution || queryResolution}
      </div>
      <div className="expanded-query-user-interaction font-paragraph-black-light">
        <div className="query-answer-card-footer-eachside query-answer-card-footer-date">
          22/07/2001
        </div>
        <div className="query-answer-card-footer-eachside expanded-query-like">
          <img src={LikeIcon} alt="likeIcon" />
        </div>
      </div>
    </div>
  );
};

export default ExpandedQueryChat;
