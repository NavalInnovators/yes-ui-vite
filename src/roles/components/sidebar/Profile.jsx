import { useLocation } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center gap-[18px]">
      <img
        className="rounded-full w-[77px]"
        src="/pfp.jpg"
        alt="Profile Photo"
      />

      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">User Name</p>
        <p className="dark:text-dark-text-muted text-gray-500 font-light text-[15px]">
          Role: {role}
        </p>
      </div>
    </div>
  );
}
