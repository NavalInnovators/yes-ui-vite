import NavigationBar from "../Reviewer/components/NavigationBar";
import SideBar from "./components/sidebar/SideBar";
import CreatorMain from "./components/CreatorMain";
import GradientDiv from "../components/GradientDiv";

import { useContext, useEffect, useState } from "react";
import QuestionsContext from "./context/QuestionsContext";
import WindowWidthContext, { WindowWidthProvider } from "./context/WindowWidthContext";
import { DarkModeProvider } from "../Reviewer/context/DarkModeContext";



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
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="h-screen flex flex-col">
          <NavigationBar />
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
