import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpVerification.css";
import "./Login.css";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { validateOtp } from "../api/api";
import { useAuth } from "./AuthProvider";

const resendOtp = async ({ profileId, token }) => {
  const response = await fetch(
    "https://your-exam-sathi-backend.onrender.com/api/auth/otp/resend",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        profileId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to resend OTP");
  }

  return response.json();
};

function OtpVerification() {
  const { getEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));

  // TODO: optimize this with redux or local storage
  const [email, setEmail] = useState("");

  const [timer, setTimer] = useState(60);
  const [resendTimer, setResendTimer] = useState(60);
  const [resendAvailable, setResendAvailable] = useState(false);

  // Validate route state
  useEffect(() => {
    const mail = getEmail();
    if(mail === null){
      navigate("/login", { replace: true });
    }
    setEmail(mail);
  }, [location.state, navigate,getEmail]);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timer]);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendAvailable(true);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [resendTimer]);

  const { mutate: validateOtpMutation, isLoading: isValidating } = useMutation({
    mutationFn: (data) => validateOtp(data),
    onSuccess: (data) => {
      toast.success("OTP verified successfully!");
      localStorage.removeItem("email");
      navigate("/verification-detail", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to validate OTP");
      setOtp(new Array(4).fill(""));
      console.error("Error:", error);
    },
  });

  // Resend OTP mutation
  const { mutate: resendOtpMutation, isLoading: isResending } = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      setTimer(60);
      setResendAvailable(false);
      toast.success("OTP resent successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to resend OTP");
    },
  });

  // Auto-navigate when timer expires
  // useEffect(() => {
  //   let timeout;
  //   if (timer === 0) {
  //     timeout = setTimeout(() => {
  //       navigate("/login", { replace: true });
  //       toast.error("OTP expired. Please try again.");
  //     }, 1000);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [timer, navigate]);

  // async function handleOtpSubmit(userOtp) {
  //   // const email = location.state.email;

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const raw = JSON.stringify({
  //     email: "weroce2983@ronete.com",
  //     otp: "1105",
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://your-exam-sathi-backend.onrender.com/api/auth/otp/validate",
  //       requestOptions
  //     );
  //     const result = await response.text();
  //     if (result.status === 200) {
  //       return true;
  //     } else {
  //       alert("Something went wrong");
  //       return false;
  //     }
  //   } catch (error) {
  //     alert("Something went wrong");
  //     return false;
  //   }
  // }

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle Backspace key for OTP inputs
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const prevInput = e.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.includes("") || timer === 0) return;

    const formatterOtp = otp.join("");

    validateOtpMutation({
      otp: formatterOtp,
      email,
    });
  };

  // Handle Resend OTP
  const handleResendOtp = (e) => {
    e.preventDefault();
    if (!resendAvailable) return;

    setOtp(new Array(4).fill(""));
    setTimer(60);
    setResendAvailable(false);
    setResendTimer(60);

    resendOtpMutation({
      profileId: location.state.profileId,
      token: location.state.token,
    });
  };

  return (
    <div className="otp-verification-container">
      <form className="otp-verification-form" onSubmit={handleSubmit}>
        <div className="otp-heading">Enter OTP</div>
        <div className="otp-subheading">
          {timer > 0
            ? `OTP will expire in ${timer} seconds`
            : "OTP has expired. Please try again."}
        </div>

        <div className="otp-inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputMode="numeric"
              pattern="[0-9]*"
              disabled={isValidating}
              autoComplete="off"
            />
          ))}
        </div>

        <div className="resend-otp-timer">
          {!resendAvailable ? (
            <div className="resend-section resend-link">
              Resend OTP after {resendTimer} sec
            </div>
          ) : (
            <button
              onClick={handleResendOtp}
              className="resend-link"
              disabled={isResending}
              type="button"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

        <button
          type="submit"
          className="submit-btn font-otp-grey"
          disabled={isValidating || otp.includes("") || timer === 0}
        >
          {isValidating ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default OtpVerification;
