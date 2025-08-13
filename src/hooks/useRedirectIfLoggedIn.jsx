import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthProvider";
import { redirect, useNavigate } from "react-router-dom";

const useRedirectIfLoggedIn = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.error("You are already logged in");
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]); // Only re-run the effect when isLoggedIn changes
};

export default useRedirectIfLoggedIn;
