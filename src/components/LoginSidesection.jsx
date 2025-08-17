import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { EmailIcon, PasswordEye, PasswordLock, GoogleIcon } from "../assets";
import { React, useState } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { apiLogin, apiGoogleLogin } from "../api/api";
import GoogleSignIn from "./GoogleSignIn.jsx";

const LoginSideSection = () => {
  const navigate = useNavigate();
  const { setProfileId, setToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checkbox: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => apiLogin(data),
    onSuccess: (data) => {
      console.log(data);
      if (data.validated === "true") {
        setToken(data.token);
        setProfileId(data.profileId);
        navigate("/all-subjects");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      console.error("Error:", error.response.data.message);
    },
  });

  // Google Login mutation
  const { mutate: googleMutate, isPending: googleIsPending } = useMutation({
    mutationFn: (data) => apiGoogleLogin(data),
    onSuccess: (data) => {
      console.log("Google login success:", data);
      setToken(data.token || data.accessToken);
      setProfileId(data.profileId);
      toast.success("Google login successful!");
      navigate("/all-subjects");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Google login failed"
      );
      console.error("Google Login Error:", error);
    },
  });

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleLogin = (googleUserData) => {
    const reqData = {
      email: googleUserData.email,
      googleId: googleUserData.googleId,
      credential: googleUserData.credential,
      emailVerified: googleUserData.emailVerified,
      profilePicture: googleUserData.profilePicture,
      authProvider: "google",
    };

    googleMutate(reqData);
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google Login Error:", error);
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="login-form-container">
      <div className="login-form-heading-black">Login to your account!</div>
      <div className="login-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="login-form-email-container">
            <img className="input-icon" src={EmailIcon} alt="email-icon" />
            <input
              type="email"
              name="email"
              className=""
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <div className="error-text">{errors.email}</div>}

          <div className="login-form-pswd-container">
            <img className="input-icon" src={PasswordLock} alt="lock-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <img
              src={PasswordEye}
              className="input-icon-eye"
              alt="toggle-password-visibility"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}

          <div className="login-form-checkbox-frgt-pswd">
            <label class="custom-checkbox login-checkbox-remember">
              <input
                type="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={handleInputChange}
              />
              <span class="checkmark"></span>
              Remember Me
            </label>
            <div className="forgot-password">
              <Link to="/reset-password" className="forgot-password-text">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="">
            <input
              type="submit"
              value={isPending ? "Logging in..." : "Login"}
              disabled={isPending}
              style={{
                backgroundColor: isPending === "pending" ? "grey" : "black",
                cursor: isPending === "pending" ? "not-allowed" : "pointer",
              }}
            />
            {errors.submit && <div className="error-text">{errors.submit}</div>}
          </div>
        </form>

        {/* Google Sign-In Option */}
        <div className="google-login-section" style={{ marginTop: "20px" }}>
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

          {/* Use GoogleSignIn component instead of custom button */}
          <GoogleSignIn
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginError}
            disabled={isPending || googleIsPending}
            mode="login"
          />
        </div>
      </div>

      <div className="login-form-register-link">
        Don't have an account?
        <Link to="/signup" className="register-text">
          {" "}
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginSideSection;
