import React from "react";
import "./CompanyPageDoubtSectionNew.css";
import { YesLogoNoTextLightBG } from "../assets";

function CompanyPageDoubtSection() {
  return (
    <>
      <div className="doubt-sec">
        <div className="left-doubt-sec">
          <div className="doubt-sec-left-heading font-heading-black">
            Empowering Students Through Personalized Innovation
          </div>
          <div className="doubt-sec-left-content font-paragraph-black-light">
            Your Exam Saathi transforms exam preparation with personalized AI-driven solutions, ensuring no student is left behind.
          </div>
        </div>
        <div className="right-doubt-sec">
          {/* <div className="doubt-sec-right-div"> */}
          <div className="doubt-sec-right-content font-paragraph">
            At Your Exam Saathi, we go beyond simply digitalizing educational content—we personalize it using cutting-edge AI technology to cater to individual student needs. Our mission is ambitious yet clear: no undergraduate student should ever fail an exam, even if they begin studying just a night before. By analyzing trends, predicting questions, and offering tailored study plans, we simplify the preparation process and ensure students focus on what truly matters. We understand the challenges students face and are dedicated to providing them with smarter, faster, and more effective tools. With Your Exam Saathi, academic success is not just a goal; it’s a promise.
            <br />
            <br />
            Your Exam Saathi combines innovation with empathy to revolutionize exam preparation. By integrating AI, we make learning efficient, personalized, and focused. Our platform adapts to your needs, ensuring you cover essential topics with precision and ease. With us, even last-minute preparation becomes a pathway to success, leaving no student behind.
          </div>

          <img src={YesLogoNoTextLightBG} alt="" />

          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default CompanyPageDoubtSection;
