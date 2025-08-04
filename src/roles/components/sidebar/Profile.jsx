import { useLocation } from "react-router-dom";
import ProfileImage from "../../components/ProfileImage";

export default function Profile() {
  const location = useLocation();
  let role;

  if (location.pathname.startsWith("/creator")) {
    role = "Creator";
  } else if (location.pathname.startsWith("/reviewer")) {
    role = "Reviewer";
  } else {
    role = "User";
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[11px]">
      <ProfileImage size={62} />

      <div className="flex flex-col items-center justify-center">
        <p className="text-slate-700 dark:text-white font-bold text-[15px]">
          User Name
        </p>
        <p className="dark:text-dark-text-muted text-gray-500 font-light text-[13px]">
          Role: {role}
        </p>
      </div>
    </div>
  );
}
