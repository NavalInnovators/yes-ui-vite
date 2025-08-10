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
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";
import {
  getRandomAvatarKey,
  saveAvatarKeyForUser,
} from "../utils/avatarUtils"; 


const SignUp = () => {
  const navigate = useNavigate();
  const { setToken, setProfileId, setEmail } = useAuth();
  
  const [currentAvatarKey, setCurrentAvatarKey] = useState(""); 
  useEffect(() => {
    setCurrentAvatarKey(getRandomAvatarKey());
  }, []);


  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ accessToken: "demo-token", profileId: "demo-id" }),
          500
        );
      });
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      setProfileId(data.profileId);
      navigate("/otp-verification");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^(\d{10})?$/.test(phone);

  const validatePassword = (password) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least 1 uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least 1 lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least 1 number.";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
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
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    

    const userName = formData.firstName + formData.email.split("@")[0];

    const reqData = {
      ...formData,
      userName,
      avatarUrl:currentAvatarKey,
    };

    setEmail(formData.email);

    mutate(reqData);
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

          {/* Email */}
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

          {/* Phone */}
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

          {/* Password */}
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
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}

          {/* Confirm Password */}
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
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            />
          </div>
          {errors.confirmPassword && (
            <div className="error-text">{errors.confirmPassword}</div>
          )}

          {/* Terms */}
          <div className="signup-form-checkbox-tnc">
            <label className="custom-checkbox signup-checkbox-remember">
              <input
                type="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              By signing up I agree to all &nbsp; Terms and Conditions
            </label>
          </div>
          {errors.checkbox && (
            <div className="error-text">{errors.checkbox}</div>
          )}

          {/* Submit */}
          <div>
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

      {/* Login link */}
      <div className="signup-form-login-link">
        <div>
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
