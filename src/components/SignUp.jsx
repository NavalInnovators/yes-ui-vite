import "./SignUp.css";
import "./Login.css";
import {
  PasswordEye,
  PasswordLock,
  EmailIcon,
  UserIcon,
  PhoneIcon,
  GoogleIcon,
} from "../assets";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignUp, apiGoogleSignUp } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";
// import OtpAuth from "../Auth/OtpAuth.jsx";
import GoogleSignIn from "./GoogleSignIn.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const { setToken, setProfileId, setEmail } = useAuth();

  // Properly configured useMutation hook
  const { mutate, status } = useMutation({
    mutationFn: (data) => apiSignUp(data),
    onSuccess: (data) => {
      // TODO: save token and profileId in local storage with some other process
      setToken(data.accessToken);
      setProfileId(data.profileId);
      navigate("/otp-verification");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      console.error("Error:", error);
    },
  });

  // Google Sign-Up mutation
  const { mutate: googleMutate, status: googleStatus } = useMutation({
    mutationFn: (data) => apiGoogleSignUp(data),
    onSuccess: (data) => {
      setToken(data.accessToken);
      setProfileId(data.profileId);
      toast.success("Google sign-up successful!");
      // Google users may not need phone verification - check backend response
      navigate("/verification-detail");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Google sign-up failed"
      );
      console.error("Google Sign-Up Error:", error);
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    checkbox: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\d{10})?$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength)
      return "Password must be at least 8 characters long.";
    if (!upperCaseRegex.test(password))
      return "Password must contain at least 1 uppercase letter.";
    if (!lowerCaseRegex.test(password))
      return "Password must contain at least 1 lowercase letter.";
    if (!numberRegex.test(password))
      return "Password must contain at least 1 number.";
    if (!specialCharRegex.test(password))
      return "Password must contain at least 1 special character.";
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!validatePhone(formData.phone))
      newErrors.phone = "Invalid Phone Number";
    if (validatePassword(formData.password))
      newErrors.password = validatePassword(formData.password);
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.checkbox)
      newErrors.checkbox = "Please accept terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userName = formData.firstName + formData.email.split("@")[0];

    const reqData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      userName: userName,
      password: formData.password,
      email: formData.email,
    };

    // TODO : Save the data in local storage or other methods
    setEmail(formData.email);

    mutate(reqData);
  };

  const handleGoogleSignUp = (googleUserData) => {
    // Prevent duplicate calls
    if (googleStatus === "pending") {
      console.log("Google signup already in progress, ignoring duplicate call");
      return;
    }

    const reqData = {
      firstName: googleUserData.firstName,
      lastName: googleUserData.lastName,
      email: googleUserData.email,
      googleId: googleUserData.googleId,
      credential: googleUserData.credential,
      emailVerified: googleUserData.emailVerified,
      profilePicture: googleUserData.profilePicture,
      authProvider: "google",
    };

    console.log("Starting Google SignUp with data:", reqData);
    setEmail(googleUserData.email);
    googleMutate(reqData);
  };

  const handleGoogleSignUpError = (error) => {
    console.error("Google Sign-Up Error:", error);
    toast.error("Google sign-up failed. Please try again.");
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-heading-black">Signup your account!</div>
      <div className="signup-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="signup-form-user">
            <div className="signup-form-firstname-container">
              <img src={UserIcon} className="form-icon" alt="user-icon" />
              <input
                className="signup-form-input"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={status === "pending"}
              />
            </div>

            <div className="signup-form-lastname-container">
              <img src={UserIcon} className="form-icon" alt="user-icon" />
              <input
                className="signup-form-input"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={status === "pending"}
              />
            </div>
          </div>
          {errors.firstName && (
            <div className="error-text">{errors.firstName}</div>
          )}
          {errors.lastName && (
            <div className="error-text">{errors.lastName}</div>
          )}

          <div className="signup-form-email-container">
            <img className="form-icon" src={EmailIcon} alt="email-icon" />
            <input
              className="signup-form-input2"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={status === "pending"}
            />
          </div>
          {errors.email && <div className="error-text">{errors.email}</div>}

          <div className="signup-form-phone-container">
            <img src={PhoneIcon} className="form-icon" alt="phone-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={status === "pending"}
            />
          </div>
          {errors.phone && <div className="error-text">{errors.phone}</div>}

          <div className="signup-form-pswd-container">
            <img
              src={PasswordLock}
              className="form-icon"
              alt="password-lock-icon"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={status === "pending"}
            />
            <img
              src={PasswordEye}
              className="form-icon-eye-password"
              alt="toggle-password-visibility"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}

          <div className="signup-form-cnfrm-pswd-container">
            <img
              src={PasswordLock}
              className="form-icon"
              alt="password-lock-icon"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={status === "pending"}
            />
            <img
              className="form-icon-eye-confirmpassword"
              src={PasswordEye}
              alt="toggle-confirm-password-visibility"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          {errors.confirmPassword && (
            <div className="error-text">{errors.confirmPassword}</div>
          )}

          <div className="signup-form-checkbox-tnc">
            <label class="custom-checkbox signup-checkbox-remember">
              <input
                type="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={handleInputChange}
              />
              <span class="checkmark"></span>
              By signing up I agree to all &nbsp; Terms and Conditions
              {/* <Link to="/reset-password" className="forgot-password-text">
                &nbsp; Terms and Conditions
              </Link> */}
            </label>
          </div>

          {errors.checkbox && (
            <div className="error-text">{errors.checkbox}</div>
          )}

          <div className="">
            <button
              type="submit"
              style={{
                backgroundColor: status === "pending" ? "grey" : "black",
                cursor: status === "pending" ? "not-allowed" : "pointer",
              }}
              disabled={status === "pending"}
            >
              {status === "pending" ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Google Sign-In Option */}
        <div className="google-signup-section" style={{ marginTop: "20px" }}>
          <div
            className="or-divider"
            style={{
              textAlign: "center",
              margin: "20px 0",
              position: "relative",
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                padding: "0 15px",
                color: "#666",
                fontSize: "14px",
              }}
            >
              OR
            </span>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                right: "0",
                height: "1px",
                backgroundColor: "#ddd",
                zIndex: "-1",
              }}
            ></div>
          </div>

          <GoogleSignIn
            onSuccess={handleGoogleSignUp}
            onError={handleGoogleSignUpError}
            disabled={status === "pending" || googleStatus === "pending"}
            mode="signup"
          />
        </div>
      </div>
      <div className="signup-form-login-link">
        <div className="">
          Already have an account?
          <Link to="/login" className="login-text">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
