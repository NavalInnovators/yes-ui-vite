// import React from "react";
import "./CompanyPageFreeStuff.css";
import { Chemistry } from "../assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function CompanyPageFreeStuff() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className="free-stuff-parent-container ">
      <div className="free-stuff-heading">
        Checkout free stuff!
      </div>
      <div className="free-stuff-right-sec">
        <div onClick={isLoggedIn ? ()=>navigate('/book-dashboard') : ()=>navigate('/login')} className="free-stuff-card">
          <div className="free-stuff-card-left">
            <div className="subject-name">Subject Name</div>
            <div className="subject-description">
              Subject Description: Lorem ipsum dolor sit amet, consectetuer sed
              diam nonummy nibh euismod lorem ipsum dolor sit amecorem ipsum
              dolor sit amet, consectetuer sed diam nonummy nibh euismod lorem
              ipsum dolor sit ameco..
            </div>
            <hr />
            <div className="subject-details-parent-div">
              <div className="subject-details">University</div>
              <div className="subject-details">1st Year</div>
              <div className="subject-details">Branch</div>
            </div>
          </div>
          <div className="free-stuff-card-right">
            <img src={Chemistry} alt="" />
          </div>
        </div>
        <div className="free-stuff-card" onClick={isLoggedIn ? ()=>navigate('/book-dashboard') : ()=>navigate('/login')} >
          <div className="free-stuff-card-left">
            <div className="subject-name">Subject Name</div>
            <div className="subject-description">
              Subject Description: Lorem ipsum dolor sit amet, consectetuer sed
              diam nonummy nibh euismod lorem ipsum dolor sit amecorem ipsum
              dolor sit amet, consectetuer sed diam nonummy nibh euismod lorem
              ipsum dolor sit ameco..
            </div>
            <hr />
            <div className="subject-details-parent-div">
              <div className="subject-details">University</div>
              <div className="subject-details">1st Year</div>
              <div className="subject-details">Branch</div>
            </div>
          </div>
          <div className="free-stuff-card-right">
            <img src={Chemistry} alt="" />
          </div>{" "}
        </div>
        <button className="colourful-border-btn companyPageFreeStuffBtn" onClick={() => navigate("/all-subjects")}>Know More</button>
      </div>
    </div>
  );
}

export default CompanyPageFreeStuff;
