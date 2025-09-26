import {
  logo,
  DayNightModeBtn,
  profileIconNew,
  NotificationIcon,
  dashboardIcon,
  ProfileIcon,
  MembershipIcon,
  YourReviewIcon,
  SubmitYourQueryIcon,
  LogoutIcon,
  SearchIcon,
  Avatar01,
  Avatar02,
  Avatar03,
  Avatar04,
  Avatar05,
  Avatar06,
  Avatar07,
  Avatar08,
  Avatar09,
} from "../assets";
import { MenuIcon } from "../assets";
import { navLinks } from "../constants";
import "./Navbar.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ShoppingCart } from "lucide-react"; // ← Added cart icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const avatarMap = {
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
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const currentPath = window.location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const [profilePic, setProfilePic] = useState(profileIconNew);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Notification 1 adad asdasd aaffw rgfrefre fgerferfg ",
      isRead: false,
    },
    {
      id: 2,
      message: "Notification 2 adad asdasd aaffw rgfrefre fgerferfg ",
      isRead: false,
    },
    {
      id: 3,
      message: "Notification 3 adad asdasd aaffw rgfrefre fgerferfg ",
      isRead: false,
    },
    {
      id: 4,
      message: "Notification 4 adad asdasd aaffw rgfrefre fgerferfg ",
      isRead: false,
    },
    {
      id: 5,
      message: "Notification 5 adad asdasd aaffw rgfrefre fgerferfg ",
      isRead: false,
    },
    {
      id: 6,
      message: "Notification 6 adad asdasd aaffw rgfrefre fgerferfg ",
      isRead: false,
    },
  ]);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsDropdownOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleLogout = () => {
    logout();
    setIsNotificationDropdownOpen(false);
    setIsDropdownOpen(false);
    setProfilePic(profileIconNew);
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

    const updateProfilePic = () => {
      const storedAvatar = localStorage.getItem("profileAvatarUrl");
      if (storedAvatar) {
        setProfilePic(avatarMap[storedAvatar] || profileIconNew);
      } else {
        setProfilePic(profileIconNew);
      }
    };

    updateProfilePic();
    window.addEventListener("profileUpdated", updateProfilePic);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("storage", updateProfilePic);
    };
  }, [isLoggedIn]);

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

      {/* Mobile Navigation Menu */}
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
              <Link to="/myorders" onClick={toggleMenu}>
                My Orders
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
                      onClick={() => setIsNotificationDropdownOpen(false)}
                      key={notification.id}
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
              src={profilePic}
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
                    <Link to="/myorders">
                      <img src={MembershipIcon} alt="MembershipIcon" /> My
                      Orders
                    </Link>
                  </li>
                  <li onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/make-query" state={{ tab: "submit-query" }}>
                      <div>
                        <img
                          src={SubmitYourQueryIcon}
                          alt="SubmitYourQueryIcon"
                        />
                      </div>
                      <div>Submit Your Query</div>
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

        {/* Cart Icon added here */}
        <Link to="/mycart" className="cart-icon">
          <ShoppingCart size={40} color="#333" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
