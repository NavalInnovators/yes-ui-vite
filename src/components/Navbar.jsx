import {
  logo,
  DayNightModeBtn,
  NotificationIcon,
  dashboardIcon,
  ProfileIcon,
  MembershipIcon,
  YourReviewIcon,
  SubmitYourQueryIcon,
  LogoutIcon,
  SearchIcon,
} from "../assets";
import { MenuIcon } from "../assets";
import { navLinks } from "../constants";
import "./Navbar.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const { isLoggedIn, logout, userAvatar } = useAuth();
  const currentPath = window.location.pathname;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Notification 1", isRead: false },
    { id: 2, message: "Notification 2", isRead: false },
    { id: 3, message: "Notification 3", isRead: false },
  ]);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsDropdownOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleLogout = () => {
    logout();
    setIsNotificationDropdownOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar font-public-sans-navbar">
      <div className="navbar-left">
        <div>
          <img
            src={MenuIcon}
            alt="menuIcon"
            className="menu-icon"
            onClick={toggleMenu}
          />
        </div>
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="YES" />
          </Link>
        </div>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <div className="navbar-logo">
            <Link to="/" onClick={toggleMenu}>
              <img src={logo} alt="YES" />
            </Link>
          </div>
          <button className="cancel-btn" onClick={toggleMenu}>
            &times;
          </button>
        </div>
        <div className="mobile-nav-body">
          <ul>
            <li>
              <Link
                to={
                  localStorage.getItem("token")
                    ? "/my-subjects"
                    : "/all-subjects"
                }
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/company" onClick={toggleMenu}>
                Company
              </Link>
            </li>
            <li>
              <Link to="/membership" onClick={toggleMenu}>
                Membership
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={toggleMenu}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/career" onClick={toggleMenu}>
                Career
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={toggleMenu}>
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contacts" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        {navLinks.map((nav) => (
          <li key={nav.id}>
            <Link
              className={`${currentPath === nav.id ? "active" : "inactive"}`}
              to={`${nav.id}`}
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-icons">
        <div className="search-btn-bg">
          <img src={SearchIcon} alt="Search" className="search-btn" />
        </div>
        <div className="day-night-mode-bg">
          <img
            src={DayNightModeBtn}
            alt="DayNightBtn"
            className="day-night-btn"
          />
        </div>

        {isLoggedIn ? (
          <div className="user-profile">
            <div
              className="notification-icon-bg"
              onClick={handleNotificationClick}
            >
              <img src={NotificationIcon} alt="notification-bell" />
            </div>
            {isNotificationDropdownOpen && (
              <div
                className="notification-dropdown"
                ref={notificationDropdownRef}
              >
                <div className="notification-header">
                  <div className="font-subheading-black">Notification</div>
                  <div
                    className="mark-read font-mark-read-btn"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </div>
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => setIsNotificationDropdownOpen(false)}
                      className={`notification-item font-notification ${
                        notification.isRead ? "read" : ""
                      }`}
                    >
                      {notification.message}
                    </div>
                  ))}
                </div>
                <div
                  className="notification-footer"
                  onClick={() => setIsNotificationDropdownOpen(false)}
                >
                  <Link to="/notifications" className="font-notification">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}

            <img
              src={userAvatar || ProfileIcon}
              alt="Profile"
              className="profile-image"
              onClick={handleProfileClick}
            />

            {isDropdownOpen && (
              <div className="profile-dropdown" ref={profileDropdownRef}>
                <ul className="font-profile-dropdown">
                  <li onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/all-subjects">
                      <div>
                        <img src={dashboardIcon} alt="dashboardIcon" />
                      </div>
                      <div>Dashboard</div>
                    </Link>
                  </li>
                  <li onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/profile">
                      <div>
                        <img src={ProfileIcon} alt="ProfileIcon" />
                      </div>
                      <div>Profile</div>
                    </Link>
                  </li>
                  <li onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/membership">
                      <img src={MembershipIcon} alt="MembershipIcon" />{" "}
                      Membership
                    </Link>
                  </li>
                  <li onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/query">
                      <img
                        src={SubmitYourQueryIcon}
                        alt="SubmitYourQueryIcon"
                      />{" "}
                      Submit Your Query
                    </Link>
                  </li>
                  <li onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/review">
                      <img src={YourReviewIcon} alt="YourReviewIcon" /> Your
                      Review
                    </Link>
                  </li>
                </ul>
                <div
                  className="logout-section font-profile-dropdown"
                  onClick={handleLogout}
                >
                  <img src={LogoutIcon} alt="logoutIcon" />{" "}
                  <Link to="/">Logout</Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <div className="login-icon-bg">
              <div
                className="login-icon-img"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
            </div>
            <div className="signup-icon-bg">
              <div
                className="signup-icon-img"
                onClick={() => navigate("/signup")}
              >
                Signup
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
