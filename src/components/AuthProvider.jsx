import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getAvatarKeyForUser, resolveAvatarValue } from "../utils/avatarUtils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Token
const setToken = (token) => {
  localStorage.setItem("token", token);
};
const getToken = () => localStorage.getItem("token");

// Profile ID
const setProfileId = (profileId) => {
  localStorage.setItem("profileId", profileId);
};
const getProfileId = () => localStorage.getItem("profileId");

// Email
const setEmail = (email) => {
  localStorage.setItem("email", email);
};
const getEmail = () => localStorage.getItem("email");

// Username
const setUserName = (name) => {
  localStorage.setItem("userName", name);
};
const getUserName = () => localStorage.getItem("userName");



export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const location = useLocation();
  const queryClient = useQueryClient();
  useEffect(() => {
    const token = getToken();
    const profileId = getProfileId();
    setIsLoggedIn(!!(token && profileId));
    const avatarKey = getAvatarKeyForUser(profileId);
    const avatarPath = resolveAvatarValue(avatarKey);
    setUserAvatar(avatarPath);
  }, [location.pathname]);

  useEffect(() => {
    const syncLoginStatus = () => {
      setIsLoggedIn(!!(getToken() && getProfileId()));
    };
    window.addEventListener("storage", syncLoginStatus);
    return () => {
      window.removeEventListener("storage", syncLoginStatus);
    };
  }, []);



  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        getToken,
        setToken,
        getProfileId,
        setProfileId,
        getEmail,
        setEmail,
        logout,
        userAvatar,
        // setUserAvatar,
        getUserName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
