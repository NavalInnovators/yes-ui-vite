import "./UserDashboard.css";
import React, { useState, useEffect } from "react";
// import { BackArrow, AttachmentIcon } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllSubjects, MySubjects } from ".";
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
    enabled: isLoggedIn, // Only fetch profile when user is logged in
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
      {/* Conditional rendering based on the current path */}
      {location.pathname === "/all-subjects" && (
        <AllSubjects searchQuery={searchQuery} onSearch={handleSearchQueryChange} />
      )}
      {location.pathname === "/my-subjects" && (
        isLoggedIn ? (
          <MySubjects searchQuery={searchQuery} onSearch={handleSearchQueryChange} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
            <div className="mb-2">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Login to View Your Courses
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Sign in to access your enrolled courses, track your progress, and continue your learning journey.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-900 transition-colors font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-6 py-3 border border-zinc-800 text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserDashboard;
