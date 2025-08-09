import { useContext } from "react";
import { Outlet } from "react-router-dom";
import WindowWidthContext from "../context/WindowWidthContext";
import InReview from "./Pending/InReview";
import CreatorAnalytics from "./Pending/CreatorAnalytics";
import CreatorAnalyticsMobile from "./Pending/CreatorAnalyticsMobile";

export default function Pending() {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 1000;

  return (
    <>
      <Outlet />
      <div className={`flex gap-[20px] w-full ${isSmallScreen ? "flex-col" : ""}`}>
        {/* Mobile Analytics - shown on small screens */}
        {isSmallScreen && (
          <CreatorAnalyticsMobile />
        )}

        {/* Left side - InReview component */}
        <div className={`${isSmallScreen ? "w-full" : "flex-1"}`}>
          <InReview />
        </div>

        {/* Right side - CreatorAnalytics component */}
        {!isSmallScreen && (
          <div className="w-[250px]">
            <CreatorAnalytics />
          </div>
        )}
      </div>
    </>
  );
}