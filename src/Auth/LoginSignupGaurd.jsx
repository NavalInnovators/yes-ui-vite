import { useEffect, useState } from 'react';
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginSignupGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      toast.error("You are already logged in");
      navigate("/", { replace: true });
    }
    setIsChecking(false);
  }, [isLoggedIn, navigate]);

  // Don't render anything while checking auth state
  if (isChecking) {
    return null;
  }

  // Only render children if not logged in and done checking
  return !isLoggedIn ? children : null;
};

export default LoginSignupGuard;