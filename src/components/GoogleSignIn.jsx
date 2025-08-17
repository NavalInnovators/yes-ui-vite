import React, { useEffect, useRef, useCallback } from "react";

const GoogleSignIn = ({
  onSuccess,
  onError,
  disabled = false,
  mode = "signup",
}) => {
  const googleButtonRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleCredentialResponse = useCallback(
    (response) => {
      try {
        // Decode the JWT token to get user information
        const payload = JSON.parse(atob(response.credential.split(".")[1]));

        const googleUserData = {
          googleId: payload.sub,
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          profilePicture: payload.picture,
          emailVerified: payload.email_verified,
          credential: response.credential,
        };

        onSuccess(googleUserData);
      } catch (error) {
        console.error("Error parsing Google credential:", error);
        onError(error);
      }
    },
    [onSuccess, onError]
  );

  useEffect(() => {
    // Check if Google Client ID is configured
    if (!clientId || clientId === "your_google_client_id_here") {
      console.warn(
        "Google Client ID not configured. Please update VITE_GOOGLE_CLIENT_ID in .env file"
      );
      return;
    }

    const initializeGoogle = () => {
      if (window.google && !window.googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        window.googleInitialized = true;
      }

      if (window.google && googleButtonRef.current) {
        // Set button text based on mode
        const buttonText = mode === "login" ? "signin_with" : "signup_with";

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          text: buttonText,
          shape: "rectangular",
          width: "100%",
        });
      }
    };

    // Prevent multiple initializations
    if (window.googleInitialized) {
      // If Google is already loaded, just render the button
      if (window.google && googleButtonRef.current) {
        const buttonText = mode === "login" ? "signin_with" : "signup_with";
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          text: buttonText,
          shape: "rectangular",
          width: "100%",
        });
      }
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existingScript) {
      // Script exists, wait for it to load
      if (window.google) {
        initializeGoogle();
      } else {
        existingScript.addEventListener("load", initializeGoogle);
      }
      return;
    }

    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = initializeGoogle;

    script.onerror = () => {
      console.error("Failed to load Google Identity Services");
      onError(new Error("Failed to load Google Identity Services"));
    };

    return () => {
      // Don't remove the script as it might be used by other components
      // if (document.head.contains(script)) {
      //   document.head.removeChild(script);
      // }
    };
  }, [handleCredentialResponse, clientId, onError, mode]);

  // Show placeholder if Google Client ID is not configured
  if (!clientId || clientId === "your_google_client_id_here") {
    return (
      <div className="google-signin-container">
        <div
          style={{
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f8f9fa",
            color: "#666",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Google Sign-In (Configure VITE_GOOGLE_CLIENT_ID in .env)
        </div>
      </div>
    );
  }

  return (
    <div className="google-signin-container">
      <div
        ref={googleButtonRef}
        style={{
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
          width: "100%",
        }}
      />
    </div>
  );
};

export default GoogleSignIn;
