import React from "react";
import "./MembershipPageHeader.css";
import { vector, img1, img2 } from "../assets";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function MembershipPageHeader() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className="membership-page-header-parent">
      {/* <div className="membership-page-header"> */}
      <div className="head-text">Membership Plans</div>
      {/* </div> */}
      <div className="membership-page-card-container">
        <div className="membership-page-card">
          <img
            className="membership-page-card-img"
            src={img1}
            alt="card"
          />
          <div className="membership-page-card-content">
            <div className="membership-page-card-heading">Free Members</div>
            <div className="membership-page-card-subheading">₹0/Subject</div>
            <div className="membership-page-card-button" onClick={isLoggedIn ? ()=>navigate('/user-dashboard') : ()=>navigate('/login')} >
              Get Started
            </div>
            <hr className="membership-page-custom-hr" />
            <div className="membership-page-parent-ul-li">
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span> Free Syllabus access</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span> Free Details answers of PYQ</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span> 5 Free Summarisations and Maps</span>
              </div>
              
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="membership-page-card">
          <img
            className="membership-page-card-img"
            src={img2}
            alt="images of card 2"
          />
          <div className="membership-page-card-content">
            {/* <h1>Premium Members</h1> */}
            <div className="membership-page-card-heading">Premium Members</div>
            <div className="membership-page-card-subheading">₹100/Subject</div>
            <div className="membership-page-card-button" onClick={isLoggedIn ? ()=>navigate('/user-dashboard') : ()=>navigate('/login')} >
              Get Started
            </div>
            <hr className="membership-page-custom-hr" />
            <div className="membership-page-parent-ul-li">
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>All Free features</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Unlimited Summarisations</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Unlimited Tricks, Tips and Maps</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Access to Analytics and Prediction</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>All Filter access</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Free trial to Customised Preparation</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Free trial to Ai Featured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipPageHeader;
