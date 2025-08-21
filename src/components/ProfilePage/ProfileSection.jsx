import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  dob,
  EditDetailsIcon,
  profileIconNew,
  // SachinSharma,
  male,
  female,
  nonBinary,
  phone,
  EmailIcon,
  Avatar01,
  Avatar02,
  Avatar03,
  Avatar04,
  Avatar05,
  Avatar06,
  Avatar07,
  Avatar08,
  Avatar09
} from "../../assets";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getProfile } from "../../api/api";
import "./ProfileSection.css";
import { useAuth } from "../AuthProvider";

const ProfileSection = () => {
  const { setEmail } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    dob: "yyyy-mm-dd",
    gender: "Your gender",
    email: "Email Address",
    phone: "Phone number",
    avatarUrl: null
  });

  const avatarImages = {
    Avatar01,
    Avatar02,
    Avatar03,
    Avatar04,
    Avatar05,
    Avatar06,
    Avatar07,
    Avatar08,
    Avatar09,
  };


  // Fetch profile data
  const { data: profileDetails, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    }
  });

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
    if (!gender) {
      return profileIconNew;
    }

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
        <div className="heading-500-30-black profile-section-heading">
          Your Profile
        </div>
        <Link to="/edit-profile">
          <img src={EditDetailsIcon} alt="editIcon" />
        </Link>
      </div>
      <div className="profile-info">
        <div className="profile-image-placeholder">

          <img
            src={
              profileDetails?.profile?.avatarUrl && avatarImages[profileDetails.profile.avatarUrl]
                ? avatarImages[profileDetails.profile.avatarUrl]
                : profileIconNew
            }
            alt="Profile"
            className="profile-edit-img"
          />


          <div className="change-profile-img-text">
            <div className="font-subheading-black change-profile-heading">
              Change Profile Image
            </div>
            <div className="font-paragraph-grey change-profile-subheading">
              File format should be as JPG, PNG under 20 kb
            </div>
          </div>
        </div>

        <div className="profile-details font-paragraph-black-light">
          <div className="fname-lname-row">
            <div className="profile-sec-half-cell">
              <img src={profileIconNew} alt="Profile Icon" />
              <span className="">First Name: </span> {profileData.firstName}
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
            <img src={dob} alt="dob" />
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
      </div>
    </section>
  );
};

export default ProfileSection;
