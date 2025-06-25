import React from "react";
import OtpVerificationLeft from "../../components/OtpVerficationLeft";
import OtpVerfication from "../../components/OtpVerification";
// import styles from "./OtpVerification.module.css";
import "../../components/Login.css";

export default function OtpVerificationPage() {
  return (
    <div className="login otp-verification-page-container">
      <div className="left-container">
        <OtpVerificationLeft />
      </div>
      <div className="right-container">
        <OtpVerfication />
      </div>
    </div>
  );
}
