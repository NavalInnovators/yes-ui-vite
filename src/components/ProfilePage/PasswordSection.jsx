import React, { useState } from "react";
import { changePass } from "../../assets";
import "./ProfileSection.css";
import "./PasswordSection.css";
import { resetPasswordLink } from "../../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider"; 

const PasswordSection = () => {
  const { getEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePasswordReset = async () => {
    const email = getEmail();
    if (!email) {
      toast.error("Email not available. Please try again after loading profile.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordLink(email);
      if (response?.success) {
        toast.success("Reset password link sent to your email.");
      } else {
        toast.error(response.message || "Failed to send reset link.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="password" className="profile-sections">
      <div className="section-header">
        <div className="heading-500-30-black profile-section-heading">
          Password
        </div>
      </div>
      <div className="profile-sec-full-cell password-sec-full-cell">
        <img src={changePass} alt="change pass" />
        <div className="password-button-parent">
          <span>Request for changing your password </span>
          <div 
          className="password-button" 
          onClick={handlePasswordReset}
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.6 : 1 }}
          >Request</div>
        </div>
      </div>
    </section>
  );
};

export default PasswordSection;
