import { useContext } from "react";
import WindowWidthContext from "../Reviewer/context/WindowWidthContext";

export default function GradientDiv({ children }) {
  const windowWidth = useContext(WindowWidthContext);
  const isMobile = windowWidth < 700;
  
  const padding = "p-[20px]";
  const height = isMobile ? "h-[45px]" : "h-[63px]";

  return (
    <div
      className={`${padding} ${height} flex justify-between items-center bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)] text-[#fff]`}
    >
      {children}
    </div>
  );
}
