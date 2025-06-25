import "./UserDashboard.css";
import React, { useState, useEffect } from "react";
// import { BackArrow, AttachmentIcon } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllSubjects, MySubjects, SearchBar } from ".";
import { getProfile } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { isLoggedIn } = useAuth();
  const [userFirstName, setUserFirstName] = useState("User");
  const location = useLocation();
  const navigate = useNavigate();

  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("/all-subjects");

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Set the default tab to "All Subjects" on initial load or if URL is "/user-dashboard"
  useEffect(() => {
    if (location.pathname === "/user-dashboard") {
      navigate("/all-subjects");
      setActiveTab("/all-subjects");
    } else {
      setActiveTab(location.pathname);
    }
  }, [location, navigate]);

  const { data: profileData, isLoading: profileIsLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfile,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (profileIsLoading) {
      setUserFirstName("!");
    } else if (isError) {
      setUserFirstName("User");
      toast.error("Error getting your profile, please refresh and make sure you are logged in!")
    } else if (isLoggedIn && profileData?.profile?.firstName) {
      setUserFirstName(profileData.profile.firstName);
    } else {
      setUserFirstName("User");
    }
  }, [profileIsLoading, isError, profileData, isLoggedIn]);



  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to update search query
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="userdashboard-container">
      <div className="gradient-strip">
        <div className="gradient-strip-heading-left">Welcome {userFirstName}</div>

        {/* <div className="gradient-strip-heading-right">
          <div className="gradient-strip-normal-text">Profile Completed:</div>
          52%
        </div> */}
      </div>
      <div className="userdashboard-tabs-container">
        <Link
          to="/all-subjects"
          onClick={() => handleTabClick("/all-subjects")}
        >
          <div
            className={`userdashboard-tab border-left-both-corner font-colourful-border-btn ${activeTab === "/all-subjects" ? "active-tab" : ""
              }`}
          >
            All Courses
          </div>
        </Link>
        <Link to="/my-subjects" onClick={() => handleTabClick("/my-subjects")}>
          <div
            className={`userdashboard-tab border-right-both-corner font-colourful-border-btn ${activeTab === "/my-subjects" ? "active-tab" : ""
              }`}
          >
            My Courses
          </div>
        </Link>
      </div>
      {/* Pass the search query to the AllSubjects component */}
      <SearchBar onSearch={handleSearchQueryChange} />
      {/* Conditional rendering based on the current path */}
      <div>
        {location.pathname === "/all-subjects" && (
          <AllSubjects searchQuery={searchQuery} />
        )}
        {location.pathname === "/my-subjects" && (
          <MySubjects searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
