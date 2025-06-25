import React from "react";
import "./MembershipPageAccordion.css";
import { dropdown } from "../assets";

function MembershipPageAccordion() {
  return (
    <div className="membership-page-accordion-parent">
      <ul id="accordion">
        <li>
          <label htmlFor="first">
          What are the benefits of becoming a Premium Member?
            <span>
              <img src={dropdown} alt="" />
            </span>
          </label>
          <input type="radio" name="accordion" id="first" defaultChecked="" />
          <div className="content">
            <p>
            Premium Membership offers unlimited access to all our features, including unlimited summarizations, rephrasing, mind maps, tricks, and tips. You’ll also gain access to full analytics, predictive question trends, and exclusive filters. Additionally, you’ll get a free trial of the Customized Preparation and AI Features, enhancing your exam prep experience.
            </p>
          </div>
        </li>
        <hr className="accordion-hr" />
        <li>
          <label htmlFor="second">
          What is included in the Free Membership plan?
            <span>
              <img src={dropdown} alt="" />
            </span>
          </label>
          <input type="radio" name="accordion" id="second" />
          <div className="content">
            <p>
            The Free Membership plan gives you access to basic features like the syllabus, previous year’s questions with answers, and 5 free summarizations. You’ll also get limited access to tricks, maps, and a few other essential resources to help with your exam preparation.
            </p>
          </div>
        </li>
        <hr className="accordion-hr" />
        <li>
          <label htmlFor="third">
          How much does the Premium Membership cost?
            <span>
              <img src={dropdown} alt="" />
            </span>
          </label>
          <input type="radio" name="accordion" id="third" />
          <div className="content">
            <p>
            The Premium Membership costs ₹100 per subject, providing you with unlimited access to all the features such as summarization, rephrasing, maps, tricks, and AI-driven analytics. It’s the most comprehensive plan for students who want to maximize their exam preparation.
            </p>
          </div>
        </li>
        <hr className="accordion-hr" />
        <li>
          <label htmlFor="fourth">
          Can I try Premium features before committing?
            <span>
              <img src={dropdown} alt="" />
            </span>
          </label>
          <input type="radio" name="accordion" id="fourth" />
          <div className="content">
            <p>
            Yes! As a Premium Member, you can enjoy free trials for the Customized Preparation and AI Features. This gives you a chance to experience the full potential of our platform before making a long-term commitment.
            </p>
          </div>
        </li>
        <hr className="accordion-hr" />
        <li>
          <label htmlFor="fifth">
          Are there any limits to the features in the Free Membership plan?
            <span>
              <img src={dropdown} alt="" />
            </span>
          </label>
          <input type="radio" name="accordion" id="fifth" />
          <div className="content">
            <p>
            Yes, the Free Membership has limitations. You’ll only have access to basic resources like the syllabus and previous year’s questions, with a cap on summarizations and tricks/maps. Premium Membership offers unlimited access to all these features, along with advanced tools like analytics and predictive question trends.
            </p>
          </div>
        </li>
      </ul>{" "}
    </div>
  );
}

export default MembershipPageAccordion;
