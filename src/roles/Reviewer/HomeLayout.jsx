import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import WelcomeBar from "./components/WelcomeBar";
import SideBar from "../components/sidebar/SideBar";
import { useEffect, useState } from "react";
import QuestionsContext from "./context/QuestionsContext";

const QUESTIONS_URL = "http://localhost:3002/questions";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // JSON Server URL (Dummy Data) - http://localhost:3002/questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setIsLoading(true);
        const response = await fetch(QUESTIONS_URL);
        const fetchedQuestions = await response.json();

        setQuestions(fetchedQuestions);
      } catch (err) {
        console.log("An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="select-none" id="needs-dark-mode">
      <NavigationBar />
      <WelcomeBar />

      <div className="flex">
        {isSidebarOpen && <SideBar />}

        <div className="p-[20px] w-full dark:bg-black">
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
