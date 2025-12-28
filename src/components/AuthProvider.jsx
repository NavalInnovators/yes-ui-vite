import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import tokenStorage from "../utils/tokenStorage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const setToken = (token) => {
  tokenStorage.setToken(token);
};

const getToken = () => {
  return tokenStorage.getToken();
};

const getProfileId = () => {
  return tokenStorage.getProfileId();
};

const setProfileId = (profileId) => {
  tokenStorage.setProfileId(profileId);
};

const getEmail = () => {
  return tokenStorage.getEmail();
};

const setEmail = (email) => {
  tokenStorage.setEmail(email);
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

    window.addEventListener("storage", syncLoginStatus);
    return () => {
      window.removeEventListener("storage", syncLoginStatus);
    };
  }, []);

  const queryClient = useQueryClient();
  const logout = () => {
    // Track logout before clearing data
    if (typeof window !== "undefined" && window.trackUserLogout) {
      window.trackUserLogout();
    }

    setIsLoggedIn(false);
    // Clear auth data from cookies
    tokenStorage.clearAll();
    // Still clear localStorage and sessionStorage for other data
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
