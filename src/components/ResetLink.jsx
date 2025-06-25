import React, { useState } from "react";
import "./ResetLink.css";
import { EmailIcon } from "../assets";
import { Link } from "react-router-dom";
import { resetPasswordLink } from "../api/api";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleResetLinkSend = async (e) => {
    e.preventDefault(); // prevent form default behavior

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await resetPasswordLink(email);
      toast.success(response.message); // show success message
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="reset-form-container">
      <form className="reset-form" onSubmit={handleResetLinkSend}>
        <div className="login-form-heading-black">Send Reset Link</div>
        <div className="input-container-email">
          <img className="input-icon-email" src={EmailIcon} alt="email-icon" />
          <input
            type="email"
            className="email-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Link</button>
        <Link to="/login" className="font-public-sans-navbar">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
