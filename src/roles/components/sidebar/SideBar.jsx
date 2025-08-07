import { useContext } from "react";
import WindowWidthContext from "../../Reviewer/context/WindowWidthContext";

export default function SideBar({ children, className = "" }) {
  const windowWidth = useContext(WindowWidthContext);
  const isMobile = windowWidth < 700;
  const welcomeBarHeight = isMobile ? 45 : 63;
  
  const sideBarStyles = `min-w-[200px] max-w-[200px] justify-between min-h-[calc(100vh-64px-${welcomeBarHeight}px)] dark:bg-black border-r-[1px] dark:text-white border-light-border dark:border-r-dark-border flex flex-col gap-[15px] px-[20px] font-light text-gray-500 py-[20px]`;

  return <div className={`${className} ${sideBarStyles} `}>{children}</div>;
}
