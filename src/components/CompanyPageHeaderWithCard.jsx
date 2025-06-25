import React from "react";
import "./CompanyPageHeaderWithCard.css";
import { imgA, imgB, imgC } from "../assets";
export default function CompanyPageHeaderWithCard() {
  return (
    <div className="company-header-card">
      <div className="header-text-card">
      Why Choose Your Exam Saathi?
      </div>
      <div className="company-card-container">
        <div className="company-card">
          <img src={imgC} alt="" />
          <div className="company-card-inner-heading">
          AI-Powered Insights
          </div>
          <div className="company-card-inner-text">
          Gain personalized study plans, trend analysis, and question predictions tailored to your preparation needs for smarter learning and better results.
          </div>
        </div>
        <div className="company-card">
          <img src={imgB} alt="" />
          <div className="company-card-inner-heading">One-Stop Solution</div>
          <div className="company-card-inner-text">
          Access trusted, last-minute resources, including concise notes, summaries, and previous year’s questions—all designed to help you prepare effectively and efficiently.
          </div>
        </div>
        <div className="company-card">
          <img src={imgA} alt="" />
          <div className="company-card-inner-heading">
          Time-Saving Tools
          </div>
          <div className="company-card-inner-text">
          Optimize your study time with concise summaries, tricks, mind maps, and targeted preparation tools, helping you focus on what matters most.
          </div>
        </div>
      </div>
    </div>
  );
}
