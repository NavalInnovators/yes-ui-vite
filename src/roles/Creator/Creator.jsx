import NavigationBar from "../Reviewer/components/NavigationBar";
import SideBar from "./components/sidebar/SideBar";
import CreatorMain from "./components/CreatorMain";
import GradientDiv from "../components/GradientDiv";

import { useEffect, useState } from "react";
import QuestionsContext from "./context/QuestionsContext";

function TopGradientBar() {
  return (
    <GradientDiv>
      <h1 className="text-[25px]">Creator Mode</h1>
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
  );
}
