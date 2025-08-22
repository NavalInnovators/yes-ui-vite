import "./SubmitQuery.css"
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

function SubmitQuery() {
  const location = useLocation();
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');

  // Determine active tab from route
  // const activeTab = location.pathname === "/query" ? "your-answers" : "submit-query";
  const activeTab = location.state?.tab
    ? location.state.tab
    : location.pathname === "make-query"
      ? "submit-query"
      : "your-answers";

  return (
    <div className="submit-query-container">
      <div className="gradient-bar">
        <span className="gradient-text">Submit Your Query</span>
      </div>
      <div className="tabs">
        <Link
          to="/query"
          className={`Your-answers${activeTab === 'your-answers' ? ' active-tab' : ''}`}
        >
          Your Answers
        </Link>
        <Link
          to="/make-query"
          className={`Subject-query${activeTab === 'submit-query' ? ' active-tab' : ''}`}
        >
          Submit your query
        </Link>
      </div>
      <div className="submit-query-form-container">
        <div className="two-lines">
          {activeTab === 'your-answers' ? (
            <h2>
              You haven't posted any Query yet. Submit your Query now to get the answer.
            </h2>
          ) : (
            <>
              <h2>Submit a Query!</h2>
              <p>We will get back to you absolutely as soon as possible!</p>
            </>
          )}
        </div>
        {activeTab === 'submit-query' && (
          <form onSubmit={e => { e.preventDefault(); }}>
            <div className="submit-query-form-group">
              <select className="submit-query-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Subject</option>
              </select>
            </div>
            <div className="submit-query-query">
              <textarea placeholder="Your Query" id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button className="submit-query-submit-button">Submit</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default SubmitQuery;