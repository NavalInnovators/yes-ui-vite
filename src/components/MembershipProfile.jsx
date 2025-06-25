import "./MembershipProfile.css";
import { BackArrow } from "../assets";
import React from 'react';
import { useNavigate } from "react-router-dom";
const MembershipProfile = () => {
    const navigate = useNavigate();
    return (
        <div className="membership-profile-container">
            <div className="gradient-strip">
                
                <div className="gradient-strip-heading-left">
                <div className="back-arrow">
                <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
                </div>
                  Memberships
                </div>
            </div>
        
        This is MembershipProfile page

        </div >
    );
}

export default MembershipProfile;