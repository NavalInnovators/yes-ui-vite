import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  dob,
  EditDetailsIcon,
  profileIconNew,
  male,
  female,
  nonBinary,
  phone,
  EmailIcon,
} from "../../assets";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getProfile } from "../../api/api";
import "./ProfileSection.css";
import { useAuth } from "../AuthProvider";

const ProfileSection = () => {
  const { setEmail, userAvatar } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    dob: "yyyy-mm-dd",
    gender: "Your gender",
    email: "Email Address",
    phone: "Phone number",
    avatarUrl: null,
  });

  const { data: profileDetails } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    },
  });

  // Populate profile from API
  useEffect(() => {
    if (profileDetails) {
      setProfileData({
        firstName: profileDetails.profile.firstName || "First Name",
        lastName: profileDetails.profile.lastName || "Last Name",
        username: profileDetails.profile.userName || "Username",
        dob: profileDetails.profile.dateOfBirth || "yyyy-mm-dd",
        gender: profileDetails.profile.gender || "Your Gender",
        email: profileDetails.profile.email || "Email Address",
        phone: profileDetails.profile.phone || "Phone number",
        avatarUrl: profileDetails.profile.avatarUrl,
      });
      setEmail(profileDetails.profile.email);
    }
  }, [profileDetails, setEmail]);

  const formatToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const getGenderIcon = (gender) => {
    if (!gender) return profileIconNew;
    switch (gender.toLowerCase()) {
      case "male":
        return male;
      case "female":
        return female;
      case "transgender":
        return nonBinary;
      default:
        return profileIconNew;
    }
  };

  return (
    <section id="profile" className="profile-sections">
      <div className="section-header">
        <div
          className="profile-header-left"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="profile-photo-box">
            <img
              src={userAvatar || profileIconNew}
              alt="Profile"
              className="profile-edit-img"
            />
          </div>

          <div
            className="profile-name-and-upload"
            style={{ marginLeft: "20px" }}
          >
            <div
              className="profile-name"
              style={{ fontWeight: "bold", fontSize: "1.8rem" }}
            >
              {profileData.firstName} {profileData.lastName}
            </div>
          </div>
        </div>

        <div className="profile-header-right">
          <Link to="/edit-profile" className="edit-profile-link">
            <img src={EditDetailsIcon} alt="Edit" />
          </Link>
        </div>
      </div>

      <div className="profile-details font-paragraph-black-light">
        <div className="fname-lname-row">
          <div className="profile-sec-half-cell">
            <img src={profileIconNew} alt="Profile Icon" />
            <span>First Name: </span> {profileData.firstName}
          </div>
          <div className="profile-sec-half-cell">
            <img src={profileIconNew} alt="Profile Icon" />
            <span>Last Name: </span> {profileData.lastName}
          </div>
        </div>
        <div className="profile-sec-full-cell">
          <img src={profileIconNew} alt="Profile Icon" />
          <span>Username: </span> {profileData.username}
        </div>
        <div className="profile-sec-full-cell">
          <img src={dob} alt="DOB Icon" />
          <span>Date of Birth: </span> {formatToDDMMYYYY(profileData.dob)}
        </div>
        <div className="profile-sec-full-cell">
          <img src={getGenderIcon(profileData.gender)} alt="Gender Icon" />
          <span>Gender: </span> {profileData.gender}
        </div>
        <div className="profile-sec-full-cell profile-email">
          <img src={EmailIcon} alt="Email Icon" />
          <span>Email: </span> {profileData.email}
        </div>
        <div className="profile-sec-full-cell profile-sec-phone-full-cell">
          <img src={phone} alt="Phone Icon" />
          <span>Phone: </span> {profileData.phone}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
