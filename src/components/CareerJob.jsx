import React from "react";
import { useLocation } from "react-router-dom";
import "./CareerJob.css";
function CareerJob() {
  const location = useLocation();
  const { job } = location.state || {}; // Access job data passed via navigation

  if (!job) {
    return <div className="loading-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontSize: '1.2rem' 
    }}>Loading job details...</div>;
  }

  return (
    <div className="careerJob-page">
      {/* Career Header */}
      <div className="header font-header">
        <div className="main-heading">
          {job.title}
        </div>
      </div>

      {/* Job Card */}
      <div className="career-jobcard">
        <div className="inner-jobcard">
          <div className="btn">
            <button className="apply-btn font-black-btn" onClick={() => window.open(job.link, "_blank", "noopener,noreferrer")}>Apply</button>
          </div>

          {/* Roles and Responsibilities */}
          <div className="section-carrer">
            <div className="section--heading">
              Roles and Responsibilities
            </div>
            <ul>
            {job.role_and_responsibilities.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>
          
          {/* Qualifications and Experience */}
          <div className="section-carrer">
            <div className="section--heading">
              Qualifications & Experience
            </div>
            <ul>
            {job.qualifications_and_experience.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerJob;
