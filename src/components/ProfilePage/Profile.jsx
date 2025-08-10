import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import PasswordSection from "./PasswordSection";
import EducationSection from "./EducationSection";
import "./Profile.css";
import "../gradient-strip.css";
import { useAuth } from "../AuthProvider";

const Profile = () => {
  const { userAvatar } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState(null);

  const navbar = document.querySelector(".navbar");
  const navbarOffset = navbar?.offsetHeight || 0;

  useEffect(() => {
    if (userAvatar) {
      setAvatarSrc(userAvatar);
    }
  }, [userAvatar]);

  return (
    <div className="profile-container">
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">Profile</div>
      </div>

      <div className="profile-page-main-container">
        {/* Sidebar */}
        <div className="profile-page-sidebar">
          {/* Avatar Display */}
          {avatarSrc && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={avatarSrc}
                alt="User Avatar"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <ul className="profile-sidebar-ul">
            <li className="profile-sidebar-ul-li">
              <Link
                to="/profile#profile"
                smooth="true"
                offset={navbarOffset}
                className="profile-sidebar-text asideLink"
              >
                Profile
              </Link>
              <hr />
            </li>
            <hr />
            <li className="profile-sidebar-ul-li">
              <Link
                to="/profile#password"
                smooth="true"
                offset={navbarOffset}
                className="profile-sidebar-text asideLink"
              >
                Password
              </Link>
              <hr />
            </li>
            <hr />
            <li className="profile-sidebar-ul-li">
              <Link
                to="/profile#education"
                smooth="true"
                offset={navbarOffset}
                className="profile-sidebar-text asideLink"
              >
                Education Details
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="profile-page-content">
          <ProfileSection />
          <PasswordSection />
          <EducationSection />
        </div>
      </div>
    </div>
  );
};

export default Profile;
