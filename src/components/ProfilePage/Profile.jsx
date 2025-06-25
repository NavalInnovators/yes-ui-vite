// import { BackArrow } from "../../assets";
import React, { useState, useEffect } from "react";
import { 
  // useNavigate, 
  Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import PasswordSection from "./PasswordSection";
import EducationSection from "./EducationSection";
import "./Profile.css";
import "../gradient-strip.css";

const Profile = () => {

  const navbar = document.querySelector(".navbar");
  const navbarOffset = navbar?.offsetHeight || 0;

  return (
    <div className="profile-container">
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">
          {/* <div className="back-arrow">
            <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
          </div> */}
          Profile
        </div>
        {/* <div className="gradient-strip-heading-right">
          <div className="gradient-strip-normal-text">Profile Completed:</div>
          52%
        </div> */}
      </div>

      <div className="profile-page-main-container">
        {/* Sidebar */}
        <div className="profile-page-sidebar">
          <ul className="profile-sidebar-ul">
            <li className="profile-sidebar-ul-li">
              <Link
                to="/profile#profile"
                smooth="true"
                offset={navbarOffset}
                className="profile-sidebar-text asideLink"
              >
                Profile
              </Link>
              <hr />
            </li>
            <hr />
            <li className="profile-sidebar-ul-li">
              <Link
                to="/profile#password"
                smooth="true"
                offset={navbarOffset}
                className="profile-sidebar-text asideLink"
              >
                Password
              </Link>
              <hr />
            </li>
            <hr />
            <li className="profile-sidebar-ul-li">
              <Link
                to="/profile#education"
                smooth="true"
                offset={navbarOffset}
                className="profile-sidebar-text asideLink"
              >
                Education Details
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="profile-page-content">
          <ProfileSection />
          <PasswordSection />
          <EducationSection />
        </div>
      </div>
    </div>
  );
};

export default Profile;
