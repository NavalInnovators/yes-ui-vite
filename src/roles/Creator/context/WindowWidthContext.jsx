import { createContext, useContext, useEffect, useState } from "react";

const WindowWidthContext = createContext();

export function WindowWidthProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
}

export function useWindowWidth() {
  const context = useContext(WindowWidthContext);
  if (context === undefined) {
    throw new Error("useWindowWidth must be used within a WindowWidthProvider");
  }
  return context;
}

export default WindowWidthContext;
