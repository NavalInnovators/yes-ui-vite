import "./EditProfile.css";
import "../Profile-old.css";
import {
  BackArrow,
  dob,
  // EmailIcon,
  profileIconNew,
  // SachinSharma,
  male,
  female,
  nonBinary,
  // phone,
} from "../../assets";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../../api/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns';

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    dob: "",
    gender: "",
    email: "Email Address",
    phone: "Phone number",
    avatarUrl: null
  });

  const [errors, setErrors] = useState({});

  // Fetch profile data
  const { data: profileDetails, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    }
  });

  // Update profile mutation
  const { mutate, status } = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      navigate(-1);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Failed to update profile"
      );
    },
  });

  // Update form data when profile details are loaded
  useEffect(() => {
    if (profileDetails) {
      setFormData({
        firstName: profileDetails.profile.firstName || "First Name",
        lastName: profileDetails.profile.lastName || "Last Name",
        username: profileDetails.profile.userName || "Username",
        dob: profileDetails.profile.dateOfBirth || "",
        gender: profileDetails.profile.gender || "",
        email: profileDetails.profile.email || "Email Address",
        phone: profileDetails.profile.phone || "Phone number",
      });
    }
  }, [profileDetails]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim() || formData.firstName === "First Name") {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim() || formData.lastName === "Last Name") {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email || formData.email === "Email Address") {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim() || formData.phone === "Phone number") {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.dob || formData.dob === "yyyy-mm-dd") {
      newErrors.dob = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Date change from the date picker
  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd"); // Store in yyyy-mm-dd format
    setFormData(prev => ({
      ...prev,
      dob: formattedDate,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const getGenderIcon = (gender) => {
    if (!gender) return profileIconNew;
    
    switch (gender.toLowerCase()) {
      case "male":
        return male;
      case "female":
        return female;
      case "other":
        return nonBinary;
      default:
        return profileIconNew;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const updatedProfileDetails = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      avatarUrl: null,
      gender: formData.gender,
      dateOfBirth: formData.dob,
    };
    mutate(updatedProfileDetails);
  };

  return (
    <div className="edit-profile-container">
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">
          <div className="back-arrow">
            <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
          </div>
          Edit Profile
        </div>
      </div>

      <div className="profile-edit-main">
        <div className="profile-edit-main-content">
          <section id="profile" className="profile-sections">
            <div className="section-header">
              <div className="heading-500-30-black profile-section-heading">
                Edit Your Profile
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="profile-info">
                <div className="profile-image-placeholder">
                  <img
                    src={(profileDetails && profileDetails.profile.avatarUrl !== null) ? profileDetails.profile.avatarUrl : profileIconNew}
                    alt="Profile"
                    className="profile-edit-img"
                  />
                  <div className="change-profile-img-text">
                    <div className="font-subheading-black change-profile-heading">
                      Change Profile Image
                    </div>
                    <div className="font-paragraph-grey change-profile-subheading">
                      File format should be JPG, PNG under 20 kb
                    </div>
                  </div>
                </div>
                <div className="profile-details font-paragraph-black-light">
                  <div className="fname-lname-row">
                    <div className="profile-sec-half-cell">
                      <img src={profileIconNew} alt="Profile Icon" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName === "First Name" ? "" : formData.firstName}
                        onChange={handleInputChange}
                        className="edit-profile-sec-input"
                        disabled={isLoadingProfile || status === "pending"}
                      />
                      {errors.firstName && (
                        <div className="error-text">{errors.firstName}</div>
                      )}
                    </div>

                    <div className="profile-sec-half-cell">
                      <img src={profileIconNew} alt="Profile Icon" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName === "Last Name" ? "" : formData.lastName}
                        onChange={handleInputChange}
                        className="edit-profile-sec-input"
                        disabled={isLoadingProfile || status === "pending"}
                      />
                      {errors.lastName && (
                        <div className="error-text">{errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  {/* <div className="profile-sec-full-cell">
                    <img src={profileIconNew} alt="Profile Icon" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username === "Username" ? "" : formData.username}
                      onChange={handleInputChange}
                      className="edit-profile-sec-input"
                      disabled= {true}
                    />
                  </div> */}

                  <div className="profile-sec-full-cell">
                    <label htmlFor="dob" className="editProfileDobLabel">
                      <img src={dob} alt="calendar" />
                    </label>
                    <DatePicker
                      id="dob"
                      name="dob"
                      selected={formData.dob ? parseISO(formData.dob, "yyyy-MM-dd", new Date()) : null}
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy" // Display in dd-MM-yyyy format
                      className="edit-profile-sec-input"
                      placeholderText="dd-mm-yyyy"
                    />
                    {errors.dob && (
                      <div className="error-text">{errors.dob}</div>
                    )}
                  </div>

                  <div className="profile-sec-full-cell">
                    <img
                      src={getGenderIcon(formData.gender)}
                      alt="Gender Icon"
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="edit-profile-sec-select"
                      disabled={isLoadingProfile || status === "pending"}
                    >
                      <option value="">Select your gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  {/* <div className="profile-sec-full-cell">
                    <img src={EmailIcon} alt="Email Icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email === "Email Address" ? "" : formData.email}
                      onChange={handleInputChange}
                      className="edit-profile-sec-select"
                      disabled={true}
                    />
                    {errors.email && (
                      <div className="error-text">{errors.email}</div>
                    )}
                  </div> */}

                  {/* <div className="profile-sec-full-cell">
                    <img src={phone} alt="Phone Icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone === "Phone number" ? "" : formData.phone}
                      onChange={handleInputChange}
                      className="edit-profile-sec-input"
                      disabled={true}
                    />
                    {errors.phone && (
                      <div className="error-text">{errors.phone}</div>
                    )}
                  </div> */}

                  <div className="profile-edit-submit">
                    <button
                      type="submit"
                      className="profile-edit-submit-button font-black-btn password-button colourful-border-btn"
                      disabled={isLoadingProfile || status === "pending"}
                      style={{
                        opacity: (isLoadingProfile || status === "pending") ? 0.7 : 1,
                        cursor: (isLoadingProfile || status === "pending") ? "not-allowed" : "pointer",
                      }}
                    >
                      {status === "pending" ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;