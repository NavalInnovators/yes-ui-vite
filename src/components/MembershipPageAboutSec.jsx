import React from "react";
import "./MembershipPageAboutSec.css";
import { YesLogoNoTextLightBG } from "../assets";

function MembershipPageAboutSec() {
  return (
    <div className="membership-page-about-sec">
      <div className="membership-page-about-sec-left">
        {/* <h1>Lorem ipsum dolor sit, amet consectetur</h1>
            <h1>adipisicing elit.</h1> */}

        <div className="membership-page-abt-h1">
        Unlock Your Path to Success with Our Membership Plans
        </div>
      </div>
      <div className="membership-page-about-sec-right">
        <div className="membership-page-about-sec-right-content">
        Unlock the full potential of your exam preparation with our exclusive membership plans! At Your Exam Saathi, we offer a range of affordable and flexible membership options designed to suit every student’s needs. With our membership, you get unlimited access to personalized study plans, AI-driven insights, targeted question banks, and a wealth of resources tailored to help you succeed. 
          <br />
          <br />
          No matter your study schedule, our platform adapts to fit your pace, ensuring maximum efficiency and results. By choosing a membership, you’re investing in smarter, faster, and more effective preparation that will give you the edge in your exams. Don’t just prepare—prepare to excel!
        </div>{" "}
        <img src={YesLogoNoTextLightBG} alt="" />
      </div>
    </div>
  );
}

export default MembershipPageAboutSec;
