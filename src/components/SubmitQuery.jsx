import "./SubmitQuery.css"
import React, { useState } from 'react';
function SubmitQuery() {
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="submit-query-container">
      <div className="gradient-bar">
        <span className="gradient-text">Submit Your Query</span>
      </div>
      <div className="tabs">
        <button className="Your-answers">Your Answers</button>
        <button className="Subject-query">Submit your query</button>
      </div>
      <div className="submit-query-form-container">
        <div className="two-lines">
          <h2>Submit a Query!</h2>
          <p>We will get back to you absolutely as soon as possible!</p></div>
        <form onSubmit={handleSubmit}>
          <div className="submit-query-form-group">

            <select className="submit-query-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Subject</option>
            </select>
          </div>
          <div className="submit-query-query">

            <textarea placeholder="Your Query" id="query" value={query} onChange={(e) => setQuery(e.target.value)} >

            </textarea>
          </div>
          <button className="submit-query-submit-button">Submit</button>
        </form>
      </div>
    </div>




  )
}

export default SubmitQuery;
