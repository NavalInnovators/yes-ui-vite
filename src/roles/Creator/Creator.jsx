import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/sidebar/SideBar";
import SidebarMobile from "./components/SidebarMobile";
import CreatorMain from "./components/CreatorMain";
import GradientDiv from "../components/GradientDiv";

import { useContext, useEffect, useState, useCallback, useRef } from "react";
import QuestionsContext from "./context/QuestionsContext";
import WindowWidthContext, { WindowWidthProvider } from "./context/WindowWidthContext";
import { DarkModeProvider } from "../Reviewer/context/DarkModeContext";
import { AnimatePresence } from "motion/react";

function TopGradientBar() {
  const windowWidth = useContext(WindowWidthContext);
  const smallScreen = windowWidth < 800;
  const headingSize = smallScreen ? "text-[18px]" : "text-[20px]";

  return (
    <GradientDiv>
      <p className={`${headingSize} font-medium`}>Creator Mode</p>
      <p>New Updates</p>
    </GradientDiv>
  );
}

const QUESTIONS_URL = "http://localhost:3003/creator_questions";

export default function Creator() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);

  // Update window width on resize
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Click outside listener to close mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileSidebarOpen(false);
      }
    };

    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  // Changing Sidebar State according to screen size
  useEffect(() => {
    if (windowWidth < 1100) {
      setIsSidebarOpen(false);
      setIsMobileSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setIsLoading(true);
        const response = await fetch(QUESTIONS_URL);
        const fetchedQuestions = await response.json();

        setQuestions(fetchedQuestions);
      } catch (err) {
        console.log("An error occurred while fetching questions");
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <DarkModeProvider>
      <WindowWidthProvider>
        <div className="h-screen flex flex-col" id="needs-dark-mode">
          <AnimatePresence>
            {!isSidebarOpen && isMobileSidebarOpen && (
              <SidebarMobile 
                setIsMobileSidebarOpen={setIsMobileSidebarOpen} 
                ref={sidebarRef}
              />
            )}
          </AnimatePresence>

          <NavigationBar setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
          <TopGradientBar />

          <div className="flex overflow-hidden">
            {isSidebarOpen && <SideBar />}

            <QuestionsContext.Provider
              value={{ questions, setQuestions, isLoading }}
            >
              <CreatorMain />
            </QuestionsContext.Provider>
          </div>
        </div>
      </WindowWidthProvider>
    </DarkModeProvider>
  );
}