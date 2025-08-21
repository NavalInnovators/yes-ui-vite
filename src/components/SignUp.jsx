import "./SignUp.css";
import "./Login.css";
import {
  PasswordEye,
  PasswordLock,
  EmailIcon,
  UserIcon,
  PhoneIcon,
} from "../assets";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignUp } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";


const SignUp = () => {
  const navigate = useNavigate();
  const { setToken, setProfileId, setEmail } = useAuth();


  // Properly configured useMutation hook
  const { mutate, status, } = useMutation({
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
  }


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
      newErrors.phone = "Invalid Phone Number"
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

  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * 9) + 1; // 1 to 9
    return `Avatar${randomIndex.toString().padStart(2, "0")}`; // Avatar01, Avatar02...
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
      avatarUrl: getRandomAvatar(),
    };

    // TODO : Save the data in local storage or other methods
    setEmail(formData.email);

    mutate(reqData);
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-heading-black">
        Signup your account!
      </div>
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
          {errors.firstName && (<div className="error-text">{errors.firstName}</div>)}
          {errors.lastName && (<div className="error-text">{errors.lastName}</div>)}

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
          {errors.password && (<div className="error-text">{errors.password}</div>)}

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
          {errors.confirmPassword && (<div className="error-text">{errors.confirmPassword}</div>)}

          <div className="signup-form-checkbox-tnc">
            <label class="custom-checkbox signup-checkbox-remember">
              <input type="checkbox"
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

          {errors.checkbox && (<div className="error-text">{errors.checkbox}</div>)}


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
