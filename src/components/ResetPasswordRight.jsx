import React, { useState, useEffect } from "react";
import "./ResetPasswordRight.css";
import { PasswordEye, PasswordLock } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import api from "../api/api";
import { BACKEND_URL } from "../constants/api";
import axios from "axios";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

function ResetPasswordRight() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenValid, setTokenValid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");
  console.log("Token is: "+ token);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await api.get(`/api/password/validate-token/${token}`);
        if (res.data.success) {
          setTokenValid(true);
        } else {
          toast.error("Token is invalid or expired");
          navigate("/"); // Redirect if token is invalid
        }
      } catch (err) {
        toast.error("Token validation failed");
        navigate("/");
      }
    };
    if (token) validateToken();
  }, [token, navigate]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/api/password/reset", {
        token,
        newPassword,
        confirmPassword,
        passwordConfirmed: true,
      });

      if (res.data.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch (err) {
      toast.error("Something went wrong during reset");
    }
  };

  // Toggle password visibility
  // const togglePasswordVisibility = () => {
  //   setShowPassword((prev) => !prev);
  // };

  // Toggle confirm password visibility
  // const toggleConfirmPasswordVisibility = () => {
  //   setShowConfirmPassword((prev) => !prev);
  // };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <div className="login-form-heading-black">Reset Password</div>

        {/* New Password Input */}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img src={PasswordLock} alt="lock-icon" className="input-icon-lock" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <img
              src={PasswordEye}
              alt="toggle-visibility-icon"
              className="action-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="input-container">
            <img src={PasswordLock} alt="lock-icon" className="input-icon-lock" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={PasswordEye}
              alt="toggle-visibility-icon"
              className="action-icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            />
          </div>

          <button className="submit-button" type="submit" disabled={!tokenValid}>Submit</button>
        </form>
        <Link to="/" className="back-link font-public-sans-navbar">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordRight;
