import "./EditProfile.css";
import "../Profile-old.css";
import {
  BackArrow,
  dob,
  profileIconNew,
  male,
  female,
  nonBinary,
} from "../../assets";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../../api/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dob: "", 
    gender: "",
    email: "",
    phone: "",
    avatarUrl: null,
  });

  const [previewPhoto, setPreviewPhoto] = useState(profileIconNew);
  const [newPhoto, setNewPhoto] = useState(null);

  const [errors, setErrors] = useState({});

  const { data: profileDetails, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    },
  });

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

  useEffect(() => {
    if (profileDetails) {
          const customPhoto = localStorage.getItem("customPhoto");

      setFormData({
        firstName: profileDetails.profile.firstName || "",
        lastName: profileDetails.profile.lastName || "",
        username: profileDetails.profile.userName || "",
        dob: profileDetails.profile.dateOfBirth || "",
        gender: profileDetails.profile.gender || "",
        email: profileDetails.profile.email || "",
        phone: profileDetails.profile.phone || "",
        avatarUrl: profileDetails.profile.avatarUrl || null,
      });

      setPreviewPhoto(profileDetails.profile.avatarUrl || profileIconNew);
    }
  }, [profileDetails]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData((prev) => ({
      ...prev,
      dob: formattedDate,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
        setNewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedProfileDetails = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      dateOfBirth: formData.dob,
      avatarUrl: newPhoto ? newPhoto : formData.avatarUrl,
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
                    src={previewPhoto}
                    alt="Profile"
                    className="profile-edit-img"
                  />

                  <div className="change-profile-img-text">
                    <div className="font-subheading-black change-profile-heading">
                      Change Profile Image
                    </div>
                    <label
                      htmlFor="profile-upload"
                      className="upload-btn"
                      style={{ cursor: "pointer", marginTop: "8px" }}
                    >
                      {newPhoto ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <div className="font-paragraph-grey change-profile-subheading">
                      JPG, PNG under 200kb
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
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="edit-profile-sec-input"
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
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="edit-profile-sec-input"
                      />
                      {errors.lastName && (
                        <div className="error-text">{errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="profile-sec-full-cell">
                    <label htmlFor="dob" className="editProfileDobLabel">
                      <img src={dob} alt="calendar" />
                    </label>
                    <DatePicker
                      id="dob"
                      selected={
                        formData.dob ? parseISO(formData.dob) : null
                      }
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy"
                      className="edit-profile-sec-input"
                      placeholderText="dd-mm-yyyy"
                    />
                    {errors.dob && (
                      <div className="error-text">{errors.dob}</div>
                    )}
                  </div>

                  <div className="profile-sec-full-cell">
                    <img src={getGenderIcon(formData.gender)} alt="Gender Icon" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="edit-profile-sec-select"
                    >
                      <option value="">Select your gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

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
