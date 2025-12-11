import { useMemo, useState, useEffect } from "react";
import "./BookDashboardMap.css";
import { useNavigate } from "react-router-dom";
import BookDashboardNavbar from "./BookDashboardNavbar";
import { useBookDashboard } from "../context/book-dashboard-context";
import { generateRoadmapFromSyllabus, convertApiRoadmapToInternal } from "../utils/roadmapUtils";
import { getRoadmap } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import BookDashboardRoadmapInput from "./BookDashboardRoadmapInput";
import { Calendar, Clock } from "lucide-react";

// Demo data - commented out, using API and syllabus data instead
// const DEMO = {
//   units: [
//     {
//       id: 1,
//       name: "Unit 1",
//       topics: [
//         { id: "u1-t3", unitId: 1, name: "Topic 3", priority: "high", avgTime: "30 mins", priorityType: "Comparison Type QnA", focus: ["who", "we", "we"], advice: "Add a little bit of body text. Add a little bit of body text. Add a little bit of body text." },
//         { id: "u1-t4", unitId: 1, name: "Topic 4", priority: "high", avgTime: "45 mins", priorityType: "Numerical Type", focus: ["formulas", "speed-accuracy"], advice: "Focus on error types; do 10 timed problems." },
//         { id: "u1-t1", unitId: 1, name: "Topic 1", priority: "medium", avgTime: "25 mins", priorityType: "Theory Type", focus: ["definitions"], advice: "Skim once, then active recall." },
//         { id: "u1-t2", unitId: 1, name: "Topic 2", priority: "medium", avgTime: "20 mins", priorityType: "Theory Type", focus: ["key concepts"], advice: "Make brief notes." },
//         { id: "u1-t5", unitId: 1, name: "Topic 5", priority: "low", avgTime: "15 mins", priorityType: "Quick Read", focus: ["summary"], advice: "Low priority; optional." },
//       ],
//     },
//     {
//       id: 2,
//       name: "Unit 2",
//       topics: [
//         { id: "u2-t4", unitId: 2, name: "Topic 4", priority: "high", avgTime: "40 mins", priorityType: "Mixed", focus: ["important derivations"], advice: "Likely in exams." },
//         { id: "u2-t1", unitId: 2, name: "Topic 1", priority: "low", avgTime: "20 mins", priorityType: "Quick Read", focus: ["overview"], advice: "Revisit if time remains." },
//       ],
//     },
//     {
//       id: 3,
//       name: "Unit 3",
//       topics: [
//         { id: "u3-t3", unitId: 3, name: "Topic 3", priority: "medium", avgTime: "30 mins", priorityType: "Conceptual", focus: ["intuition"], advice: "Link with Unit 1 topics." },
//         { id: "u3-t4", unitId: 3, name: "Topic 4", priority: "medium", avgTime: "30 mins", priorityType: "Conceptual", focus: ["applications"], advice: "Practice with examples." },
//       ],
//     },
//     {
//       id: 4,
//       name: "Unit 4",
//       topics: [
//         { id: "u4-t1", unitId: 4, name: "Topic 1", priority: "low", avgTime: "15 mins", priorityType: "Quick Read", focus: ["glossary"], advice: "Skippable if short on time." },
//         { id: "u4-t5", unitId: 4, name: "Topic 5", priority: "low", avgTime: "15 mins", priorityType: "Quick Read", focus: ["summary"], advice: "Optional refresh." },
//       ],
//     },
//   ],
// };

const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };
const PRIORITY_META = {
  high: { label: "Highest", className: "roadmap-priority-high" },
  medium: { label: "Medium", className: "roadmap-priority-medium" },
  low: { label: "Lowest", className: "roadmap-priority-low" },
};

function TopicBar({ topic, expanded, onToggle, onOpenQnA, onOpenNotes }) {
  const meta = PRIORITY_META[topic.priority] || PRIORITY_META.low;

  return (
    <div className={`topic-bar ${meta.className}`}>
      <div className="topic-bar-head">
        <div className="topic-bar-title" onClick={onToggle}>
          <span className="topic-dot" />
          <span className="topic-name">{topic.name}</span>
        </div>

        <div className="topic-bar-actions">
          <button className="pill-btn outline" onClick={onOpenQnA}>QnA</button>
          <button className="pill-btn outline" onClick={onOpenNotes}>Notes</button>
          <button 
            className="expand-icon-btn" 
            onClick={onToggle}
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <span className={`expand-icon ${expanded ? "open" : ""}`}>▾</span>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="topic-bar-body">
          <div className="topic-info">
            <div className="info-row">
              <span className="info-label">Average time to study:</span>
              <span className="info-value">{topic.avgTime}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Highest priority type:</span>
              <span className="info-value">{topic.priorityType}</span>
            </div>
            {topic.focus?.length ? (
              <div className="info-row">
                <span className="info-label">Focus on following:</span>
                <ul className="focus-list">
                  {topic.focus.map((f, i) => (<li key={i}>• {f}</li>))}
                </ul>
              </div>
            ) : null}
            {topic.advice ? (
              <div className="info-row">
                <span className="info-label">Advice:</span>
                <p className="advice-text">{topic.advice}</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookDashboardMap({
  data,
  selectedUnitId,
  onSelectUnit,
  onOpenQnA,
  onOpenNotes,
  currentSection,
  handleSectionChange,
}) {
  const navigate = useNavigate();
  const { syllabus, syllabusLoading, syllabusError, selectedUnit, setSelectedUnit, subCode } = useBookDashboard();
  const profileId = localStorage.getItem("profileId");
  const [showInput, setShowInput] = useState(false);

  // Fetch personalized roadmap from API
  const { 
    data: apiRoadmap, 
    isLoading: roadmapLoading, 
    error: roadmapError,
    refetch: refetchRoadmap 
  } = useQuery({
    queryKey: ["roadmap", profileId, subCode],
    queryFn: () => getRoadmap(profileId, subCode),
    enabled: !!profileId && !!subCode,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Generate roadmap data with priority: API > Syllabus > Empty
  const roadmapData = useMemo(() => {
    // Priority 1: Use API roadmap if available
    if (apiRoadmap && !roadmapError) {
      return convertApiRoadmapToInternal(apiRoadmap);
    }
    
    // Priority 2: Generate from syllabus
    if (syllabus && !syllabusLoading && !syllabusError) {
      return generateRoadmapFromSyllabus(syllabus);
    }
    
    // Priority 3: Use provided data or empty
    return data || { units: [] };
  }, [apiRoadmap, roadmapError, syllabus, syllabusLoading, syllabusError, data]);

  // Show input form if no API roadmap exists and user hasn't dismissed it
  useEffect(() => {
    if (!roadmapLoading && roadmapError && !apiRoadmap) {
      setShowInput(true);
    }
  }, [roadmapLoading, roadmapError, apiRoadmap]);

  const handleRoadmapGenerated = () => {
    setShowInput(false);
    refetchRoadmap();
  };

  // default nav handlers if not provided
  const handleOpenQnA = (topic) => {
    if (onOpenQnA) return onOpenQnA(topic);
    // Navigate to Q&A section with topic filter applied
    navigate("/book-dashboard?qna=1", { 
      state: { 
        topicId: topic.id, 
        topicName: topic.name,
        unitId: topic.unitId,
        filterByTopic: true
      } 
    });
  };
  const handleOpenNotes = (topic) => {
    if (onOpenNotes) return onOpenNotes(topic);
    // Navigate to Notes section with topic filter applied
    navigate("/book-dashboard?notes=1", { 
      state: { 
        topicId: topic.id, 
        topicName: topic.name,
        unitId: topic.unitId,
        filterByTopic: true
      } 
    });
  };

  // selected unit (kept in sync with parent if provided)
  const unitIds = roadmapData.units.map((u) => u.id);
  const defaultUnitId = unitIds[0];
  const [internalUnitId, setInternalUnitId] = useState(parseInt(selectedUnit) || selectedUnitId || defaultUnitId);
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  useEffect(() => {
    // expose the same roadmap data for the right panel
    window.__YES_ROADMAP__ = roadmapData;
  }, [roadmapData]);

  useEffect(() => {
    if (selectedUnitId != null) setInternalUnitId(selectedUnitId);
  }, [selectedUnitId]);

  // Sync with selectedUnit from context
  useEffect(() => {
    if (selectedUnit) {
      setInternalUnitId(parseInt(selectedUnit));
    }
  }, [selectedUnit]);


  useEffect(() => {
    const handler = (e) => {
      const t = e.detail;
      if (!t) return;
      if (onSelectUnit) onSelectUnit(t.unitId);
      setInternalUnitId(t.unitId);
      setExpandedTopicId(t.id);
      
      // Sync with left sidebar unit selection
      if (setSelectedUnit) {
        setSelectedUnit(t.unitId.toString());
      }
      
      const el = document.querySelector(".book-dashboard-map");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("roadmap:jump", handler);
    return () => window.removeEventListener("roadmap:jump", handler);
  }, [onSelectUnit, setSelectedUnit]);

  const currentUnit = useMemo(
    () => roadmapData.units.find((u) => u.id === internalUnitId) || roadmapData.units[0],
    [roadmapData.units, internalUnitId]
  );

  const sortedTopics = useMemo(() => {
    const topics = currentUnit?.topics || [];
    return [...topics].sort((a, b) => {
      const byPr = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (byPr !== 0) return byPr;
      if (a.unitId !== b.unitId) return (a.unitId || 0) - (b.unitId || 0);
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [currentUnit]);


  return (
    <div className="book-dashboard-roadmap-mid-sec">
      <div className="book-dashboard-roadmap-container">
        <BookDashboardNavbar
          currentSection={currentSection}
          handleSectionChange={handleSectionChange}
        />
        <div className="not-for-small-screens book-dashboard-roadmap-sec">
          {showInput ? (
            <div className="roadmap-center only-center">
              <BookDashboardRoadmapInput 
                subCode={subCode}
                onRoadmapGenerated={handleRoadmapGenerated}
                existingPreferences={apiRoadmap && roadmapData.metadata ? {
                  daysToExam: roadmapData.metadata.daysToExam,
                  dailyStudyHours: roadmapData.metadata.dailyStudyHours,
                  confidence: [0, 0, 0, 0, 0] // Confidence not stored, user must re-enter
                } : null}
              />
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button 
                  onClick={() => setShowInput(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#666',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Skip and use default roadmap
                </button>
              </div>
            </div>
          ) : (
            <div className="roadmap-center only-center">
              <div className="roadmap-center-header">
                <div className="roadmap-header-main">
                  <p className="rc-title">{currentUnit?.name || "Unit"}</p>
                  <p className="rc-sub">
                    {apiRoadmap ? "Your personalized study roadmap" : "Study roadmap by priority"}
                  </p>
                </div>
                {apiRoadmap && roadmapData.metadata && (
                  <div className="roadmap-metadata">
                    <div className="metadata-items">
                      <span className="metadata-item">
                        <Calendar size={14} className="metadata-icon" />
                        {roadmapData.metadata.daysToExam} days
                      </span>
                      <span className="metadata-item">
                        <Clock size={14} className="metadata-icon" />
                        {roadmapData.metadata.dailyStudyHours}h/day
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowInput(true)}
                      className="update-preferences-btn"
                    >
                      Update preferences
                    </button>
                  </div>
                )}
              </div>
              <div className="topics-stack">
                {(syllabusLoading || roadmapLoading) ? (
                  <div className="loading-state">Loading roadmap data...</div>
                ) : (syllabusError && roadmapError) ? (
                  <div className="error-state">
                    Error loading roadmap data. Please contact support team or raise a query!
                    <button 
                      onClick={() => setShowInput(true)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Create Personalized Roadmap
                    </button>
                  </div>
                ) : (
                  <>
                    {sortedTopics.map((topic) => (
                      <TopicBar
                        key={topic.id}
                        topic={topic}
                        expanded={expandedTopicId === topic.id}
                        onToggle={() => setExpandedTopicId((prev) => (prev === topic.id ? null : topic.id))}
                        onOpenQnA={() => handleOpenQnA(topic)}
                        onOpenNotes={() => handleOpenNotes(topic)}
                      />
                    ))}
                    {!sortedTopics.length && <div className="empty-state"> No topics in this unit. </div>}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}