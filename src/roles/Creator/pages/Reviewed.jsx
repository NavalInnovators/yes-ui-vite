import { useContext } from "react";
import { Outlet } from "react-router-dom";
import WindowWidthContext from "../context/WindowWidthContext";
import YourContribution from "./Reviewed/YourContribution";
import CreatorAnalytics from "./Reviewed/CreatorAnalytics";
import CreatorAnalyticsMobile from "./Reviewed/CreatorAnalyticsMobile";

export default function Reviewed() {
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

        {/* Left side - YourContribution component */}
        <div className={`${isSmallScreen ? "w-full" : "flex-1"}`}>
          <YourContribution />
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
