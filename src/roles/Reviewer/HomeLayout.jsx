import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import WelcomeBar from "./components/WelcomeBar";
import { useEffect, useState, useCallback } from "react";
import QuestionsContext from "./context/QuestionsContext";
import ReviewerSidebar from "./components/ReviewerSidebar";
import SidebarMobile from "./components/SidebarMobile";
import WindowWidthContext from "./context/WindowWidthContext";

const QUESTIONS_URL = "http://localhost:3002/questions";

export default function HomeLayout() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Desktop Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Mobile Sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Window Width State
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Responsive padding like other components
  const is600px = windowWidth < 600;
  const padding = is600px ? "p-[17px]" : "p-[20px]";

  // Changing Sidebar State according to screen size
  useEffect(() => {
    if (windowWidth < 1000) {
      setIsSidebarOpen(false);
      setIsMobileSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [windowWidth]);

  // JSON Server URL (Dummy Data) - http://localhost:3002/questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setIsLoading(true);
        const response = await fetch(QUESTIONS_URL);
        const fetchedQuestions = await response.json();

        setQuestions(fetchedQuestions);
      } catch (err) {
        console.log("An error occurred: ", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  // Responsive height calculation
  const isMobile = windowWidth < 700;
  const welcomeBarHeight = isMobile ? 45 : 63;
  const contentHeight = `h-[calc(100vh-64px-${welcomeBarHeight}px)]`;

  return (
    <div className="select-none" id="needs-dark-mode">
      {!isSidebarOpen && isMobileSidebarOpen && (
        <SidebarMobile setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
      )}

      <NavigationBar setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
      <WelcomeBar />

      <div className="flex">
        {isSidebarOpen && <ReviewerSidebar />}

        <div
          className={`${padding} w-full dark:bg-black ${contentHeight} overflow-y-scroll custom-scrollbar`}
        >
          <WindowWidthContext.Provider value={windowWidth}>
            <QuestionsContext.Provider
              value={{ questions, setQuestions, isLoading }}
            >
              <Outlet />
            </QuestionsContext.Provider>
          </WindowWidthContext.Provider>
        </div>
      </div>
    </div>
  );
}
