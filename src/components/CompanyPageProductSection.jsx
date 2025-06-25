import React from "react";
import "./CompanyPageProductSection.css";
// import { CreatorA, CreatorB, CreatorC, CreatorD } from "../assets";
import MobiusStripEl from "./MobiusStripEl";

function CompanyPageProductSection() {
  return (
    <div className="product-by-sec">
      <MobiusStripEl />
      <div className="header-text-div">
        <div className="heading-a">Product By</div>
        <div className="heading-b">Naval Innovators</div>
      </div>

      {/* ===== CREATOR SECTION ===== */}
      {/* <div className="creator-sec">
        <div className="creator-info">
          <img src={CreatorA} alt="Creator Image" />
          <div className="creator-name">Sachin</div>
          <div className="creator-designation">Post Description </div>
        </div>
        <div className="creator-info">
          <img src={CreatorB} alt="Creator Image" />
          <div className="creator-name">Sachin</div>
          <div className="creator-designation">Post Description </div>
        </div>
        <div className="creator-info">
          <img src={CreatorC} alt="Creator Image" />
          <div className="creator-name">Sachin</div>
          <div className="creator-designation">Post Description </div>
        </div>
        <div className="creator-info">
          <img src={CreatorD} alt="Creator Image" />
          <div className="creator-name">Sachin</div>
          <div className="creator-designation">Post Description </div>
        </div>
      </div> */}

      {/* ===== CONTENT SECTION ===== */}
      <div className="company-content-div">
        <div className="company-content-heading">
        Revolutionizing Exam Preparation Through Personalized AI Solutions
        </div>
        <div className="company-content">
        At the heart of Your Exam Saathi lies a vision to redefine how students prepare for exams. We aim to simplify learning by merging technology with education, ensuring every student has access to personalized tools that fit their unique needs. Our platform leverages advanced AI to analyze trends, predict questions, and craft tailored study plans. By addressing individual learning gaps and providing focused resources, we ensure students optimize their efforts. Your Exam Saathi is more than just a tool—it’s a companion that empowers students to succeed, no matter their starting point or preparation timeline.
          <br />
          <br />
          With a focus on personalization, Your Exam Saathi addresses the diverse challenges faced by students. From providing concise notes and mind maps to predictive analytics and customized preparation, our platform is designed to maximize efficiency. Whether you’re revising months in advance or preparing the night before, our AI-driven solutions ensure you stay ahead in today’s competitive academic landscape. We’re here to make success accessible to every student.
          <br />
          <br />
          Your Exam Saathi stands as a beacon of innovation in education, transforming challenges into opportunities for growth. By combining modern technology with a student-first approach, we make exam preparation smarter, faster, and more effective. Join us in revolutionizing the way students learn and achieve their academic dreams with confidence.
        </div>
      </div>
    </div>
  );
}

export default CompanyPageProductSection;
