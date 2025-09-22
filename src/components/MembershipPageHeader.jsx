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
      <div className="head-text">Pricing</div>
      {/* </div> */}
      <div className="membership-page-card-container">
        <div className="membership-page-card">
          <img
            className="membership-page-card-img"
            src={img1}
            alt="card"
          />
          <div className="membership-page-card-content">
            <div className="membership-page-card-heading">Free Plan</div>
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
                <span> Free Detailed answers of PYQ</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span> Notes Access - 1 Unit</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span> Insights Access - 1 Unit</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span> 50 Summarisations And Rephrases</span>
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
            <div className="membership-page-card-heading">Basic Plan</div>
            <div className="membership-page-card-subheading">₹110/Subject</div>
            <div className="membership-page-card-button" onClick={isLoggedIn ? ()=>navigate('/user-dashboard') : ()=>navigate('/login')} >
              Get Started
            </div>
            <hr className="membership-page-custom-hr" />
            <div className="membership-page-parent-ul-li">
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>All Free features + </span>
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
                <span>Unlimited Rephrasal</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Notes Access - All Units</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Insights Access - All Units</span>
              </div>
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div className="membership-page-card">
          <img
            className="membership-page-card-img"
            src={img2}
            alt="images of card 3"
          />
          <div className="membership-page-card-content">
            {/* <h1>Premium Members</h1> */}
            <div className="membership-page-card-heading">Pro Plan</div>
            <div className="membership-page-card-subheading">₹150/Subject</div>
            <div className="membership-page-card-button" onClick={isLoggedIn ? ()=>navigate('/user-dashboard') : ()=>navigate('/login')} >
              Get Started
            </div>
            <hr className="membership-page-custom-hr" />
            <div className="membership-page-parent-ul-li">
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>All Free features + </span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>All Pro features +</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>Personalised Roadmap</span>
              </div>
              <div className="membership-page-ul-li">
                <span>
                  <img src={vector} alt="" />
                </span>
                <span>AI Chatbot access</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipPageHeader;
