import "./SubmitQueryProfile.css";
import { BackArrow } from "../assets";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { YourQuery, MakeQuery, ExpandedQueryChat } from ".";

const SubmitQueryProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Determine active tab:
  // 1. Use location.state.tab if passed from Navbar
  // 2. Else fall back to pathname
  const activeTab = location.state?.tab
    ? location.state.tab
    : location.pathname === "/query"
    ? "your-answers"
    : "submit-query";

  return (
    <div className="submit-query-profile-container">
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">
          <div className="back-arrow">
            <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
          </div>
          Submit Your Query
        </div>
      </div>
      <div className="submit-query-content-container">
        <div className="submit-query-tabs-container">
          {/* Add active class based on activeTab */}
          <Link
            to="/query"
            state={{ tab: "your-answers" }}
            className={`submit-query-tab border-left-both-corner submit-query-left-toggle-bar ${
              activeTab === "your-answers" ? "active-tab" : ""
            }`}
          >
            Your Answers
          </Link>
          <Link
            to="/make-query"
            state={{ tab: "submit-query" }}
            className={`submit-query-tab border-right-both-corner submit-query-right-toggle-bar ${
              activeTab === "submit-query" ? "active-tab" : ""
            }`}
          >
            Submit your Query
          </Link>
          {/* <Link
            to="/query"
            className="submit-query-tab border-left-both-corner submit-query-left-toggle-bar"
            tabIndex="0"
          >
            Your Answers
          </Link>
          <Link
            to="/make-query"
            className="submit-query-tab border-right-both-corner submit-query-right-toggle-bar"
            tabIndex="0"
          >
            Submit your Query
          </Link> */}
        </div>

        {/* Conditional rendering based on the current path */}
        {location.pathname === "/query" && <YourQuery />}
        {location.pathname === "/make-query" && <MakeQuery />}
        {location.pathname === "/expanded-query" && <ExpandedQueryChat />}
      </div>
    </div>
  );
};

export default SubmitQueryProfile;
