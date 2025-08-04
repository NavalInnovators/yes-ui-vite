import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import WelcomeBar from "./components/WelcomeBar";
import { useEffect, useState } from "react";
import QuestionsContext from "./context/QuestionsContext";
import ReviewerSidebar from "./components/ReviewerSidebar";
import SidebarMobile from "./components/SidebarMobile";

const QUESTIONS_URL = "http://localhost:3002/questions";

export default function HomeLayout() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Desktop Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Mobile Sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsSidebarOpen(false);
        setIsMobileSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="select-none" id="needs-dark-mode">
      {!isSidebarOpen && isMobileSidebarOpen && (
        <SidebarMobile setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
      )}

      <NavigationBar setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
      <WelcomeBar />

      <div className="flex">
        {isSidebarOpen && <ReviewerSidebar />}

        <div className="p-[20px] w-full dark:bg-black h-[calc(100vh-64px-63px)] overflow-y-scroll custom-scrollbar">
          <QuestionsContext.Provider
            value={{ questions, setQuestions, isLoading }}
          >
            <Outlet />
          </QuestionsContext.Provider>
        </div>
      </div>
    </div>
  );
}
