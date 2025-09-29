import React, { createContext, useState, useEffect, useContext } from "react";
import { getQnA, getSyllabus, getUnitNotes, getAnalyticData } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

// Create the context
const DashboardContext = createContext();

// Custom hook to use the context
export const useBookDashboard = () => {
  return useContext(DashboardContext);
};

// Provider component for the context
export const BookDashboardProvider = ({ children }) => {
  const [selectedUnit, setSelectedUnit] = useState("1");
  const [navigation, setNavigation] = useState("");
  const [topics, setTopics] = useState("");
  const [subCode, setSubCode] = useState(sessionStorage.getItem('selectedCourseCode'));
  const [qList, setQList] = useState([[], [], [], [], []]);
  const [notesList, setNotesList] = useState({});
  const [unitInsights, setUnitInsights] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState("0");
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [notesTopics, setNotesTopics] = useState([]);
  const [selectedQnATopic, setSelectedQnATopic] = useState("All Topics");
  const [qnaTopics, setQnaTopics] = useState([]);
  const [filteredQnAQuestions, setFilteredQnAQuestions] = useState([]);
  // const [subSyllabus, setSubSyllabus] = useState([]);

  // Fetch subcode from URL
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("subcode");
    if (code) {
      setSubCode(code);
    }
  }, [searchParams]);

  // Fetch syllabus data
  const {
    data: syllabus,
    isLoading: syllabusLoading,
    error: syllabusError,
  } = useQuery({
    queryKey: ["syllabus", subCode],
    queryFn: () => getSyllabus(subCode),
    enabled: !!subCode,
  });

  // Fetch QnA data
  const {
    data: qna,
    isLoading: qnaLoading,
    error: qnaError,
  } = useQuery({
    queryKey: ["qna", subCode],
    queryFn: () => getQnA(subCode),
    enabled: !!subCode,
  });

  //Fetch unitNotes
  const {
    data: unitNotes,
    isLoading: unitNotesLoading,
    error: unitNotesError,
  } = useQuery({
    queryKey: ["unitNotes", subCode],
    queryFn: () => getUnitNotes(subCode),
    enabled: !!subCode,
  });

  //Fetch Insights Data 
  const {
    data: insights,
    isLoading: insightsLoading,
    error: insightsError,
  } = useQuery({
    queryKey: ["insights", subCode],
    queryFn: () => getAnalyticData(subCode),
    enabled: !!subCode,
  });


  useEffect(() => {
    if (qna) {
      const newQList = [[], [], [], [], []];
      
      qna.forEach((qItem) => {
        const unitIndex = parseInt(qItem.unit[0], 10) - 1;
        if (unitIndex >= 0 && unitIndex < 5) {
          newQList[unitIndex].push(qItem);
        }
      });
      
      setQList(newQList);
    }
    // if (syllabus) {
    //   setSubSyllabus(syllabus);
    // }
    if (unitNotes) {
      const tempNotesObj = {};
      const tempTopicsObj = {};
      
      unitNotes.forEach((unit) => {
        tempNotesObj[unit.unit] = unit.notes;
        tempTopicsObj[unit.unit] = unit.notes.map((note, index) => ({
          id: index,
          name: note.topic_name,
          content: note.notes
        }));
      });
      
      setNotesList(tempNotesObj);
      setNotesTopics(tempTopicsObj);
    }

    if(insights)
    {
      const tempUnitInsights = {};
      insights.forEach((u) => {
        tempUnitInsights[u.unit] = {
          unitTitle: u.unitTitle,
          topicfrequency: u.topicfrequency,
          questiontypedata: u.questiontypedata
        };
      });
      setUnitInsights(tempUnitInsights);
    }
  }, [qna, unitNotes, insights]);

  return (
    <DashboardContext.Provider
      value={{
        selectedUnit,
        setSelectedUnit,
        navigation,
        setNavigation,
        topics,
        setTopics,
        subCode,
        setSubCode,
        syllabus,
        syllabusLoading,
        syllabusError,
        qna,
        qList,
        qnaLoading,
        qnaError,
        notesList,
        unitNotesLoading,
        unitNotesError,
        selectedQuestion,
        setSelectedQuestion,
        unitInsights,
        insightsLoading,
        insightsError,
        selectedTopic,
        setSelectedTopic,
        notesTopics,
        selectedQnATopic,
        setSelectedQnATopic,
        qnaTopics,
        filteredQnAQuestions,
        setFilteredQnAQuestions,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
