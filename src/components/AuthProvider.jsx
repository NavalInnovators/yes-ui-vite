import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const getProfileId = () => {
  return localStorage.getItem("profileId");
};

const setProfileId = (profileId) => {
  localStorage.setItem("profileId", profileId);
};

const getEmail = () => {
  return localStorage.getItem("email");
};

const setEmail = (email) => {
  localStorage.setItem("email", email);
};



export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    const mail = getEmail();
    const profileId = getProfileId();
    if (token && profileId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const syncLoginStatus = () => {
      const token = getToken();
      const profileId = getProfileId();
      setIsLoggedIn(!!(token && profileId));
    };

    window.addEventListener('storage', syncLoginStatus);
    return () => {
      window.removeEventListener('storage', syncLoginStatus);
    };
  }, []);

  const queryClient = useQueryClient();
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();
    queryClient.clear();
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, getToken, setToken, getProfileId, setProfileId, getEmail, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
