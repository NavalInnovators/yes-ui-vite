import "./Login.css";
import "./OtpVerification.css";
import {
  LoginSidesection,
  OtpVerification,
  SignUp,
  VerificationDetailsForm,
  LoginSignupLeft,
  OtpVerficationLeft,
  VerifiactionDetailsLeft,
  ResetPasswordLeft,
  ResetPasswordForm,
  ResetPasswordRight,
} from ".";
import React from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  return (
    <div className="login">
      <div className="left-container">
        {location.pathname === "/login" && <LoginSignupLeft />}
        {location.pathname === "/signup" && <LoginSignupLeft />}
        {location.pathname === "/otp-verification" && <OtpVerficationLeft />}
        {location.pathname === "/verification-detail" && (
          <VerifiactionDetailsLeft />
        )}
        {location.pathname === "/reset-password" && <ResetPasswordLeft />}
        {location.pathname === "/new-password-page" && <ResetPasswordLeft />}
        {/* <div className="img-text-container">
          <img src={YesLogoNoTextLightBG} alt="yesLogo" />
          <div className="login-heading font-heading-black">
            Start your journey with
          </div>
        </div> */}
        {/* <div className="login-powered-by-card">
          <img src={MobiusStrip} alt="logoNI" />
          <div className="product-by-text-container">
            <div className="product-by-login-page">Product By</div>
            <div className="company-name-product-by-login-page">
              Naval Innovators
            </div>
          </div>
        </div> */}
      </div>
      <div className="right-container">
        {location.pathname === "/login" && <LoginSidesection />}
        {location.pathname === "/Login" && <LoginSidesection />}
        {location.pathname === "/signup" && <SignUp />}
        {location.pathname === "/otp-verification" && <OtpVerification />}
        {location.pathname === "/verification-detail" && <VerificationDetailsForm />}
        {location.pathname === "/reset-password" && <ResetPasswordForm />}
        {location.pathname === "/new-password-page" && <ResetPasswordRight />}
      </div>
    </div>
  );
};

export default Login;
