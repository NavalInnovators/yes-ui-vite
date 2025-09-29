import React, { useMemo, useState, useEffect } from "react";
import "./BookDashboardMap.css";
import { useNavigate } from "react-router-dom";
import BookDashboardNavbar from "./BookDashboardNavbar";
import { Book } from "lucide-react";
import { useBookDashboard } from "../context/book-dashboard-context";
import { generateRoadmapFromSyllabus } from "../utils/roadmapUtils";

const DEMO = {
  units: [
    {
      id: 1,
      name: "Unit 1",
      topics: [
        { id: "u1-t3", unitId: 1, name: "Topic 3", priority: "high", avgTime: "30 mins", priorityType: "Comparison Type QnA", focus: ["who", "we", "we"], advice: "Add a little bit of body text. Add a little bit of body text. Add a little bit of body text." },
        { id: "u1-t4", unitId: 1, name: "Topic 4", priority: "high", avgTime: "45 mins", priorityType: "Numerical Type", focus: ["formulas", "speed-accuracy"], advice: "Focus on error types; do 10 timed problems." },
        { id: "u1-t1", unitId: 1, name: "Topic 1", priority: "medium", avgTime: "25 mins", priorityType: "Theory Type", focus: ["definitions"], advice: "Skim once, then active recall." },
        { id: "u1-t2", unitId: 1, name: "Topic 2", priority: "medium", avgTime: "20 mins", priorityType: "Theory Type", focus: ["key concepts"], advice: "Make brief notes." },
        { id: "u1-t5", unitId: 1, name: "Topic 5", priority: "low", avgTime: "15 mins", priorityType: "Quick Read", focus: ["summary"], advice: "Low priority; optional." },
      ],
    },
    {
      id: 2,
      name: "Unit 2",
      topics: [
        { id: "u2-t4", unitId: 2, name: "Topic 4", priority: "high", avgTime: "40 mins", priorityType: "Mixed", focus: ["important derivations"], advice: "Likely in exams." },
        { id: "u2-t1", unitId: 2, name: "Topic 1", priority: "low", avgTime: "20 mins", priorityType: "Quick Read", focus: ["overview"], advice: "Revisit if time remains." },
      ],
    },
    {
      id: 3,
      name: "Unit 3",
      topics: [
        { id: "u3-t3", unitId: 3, name: "Topic 3", priority: "medium", avgTime: "30 mins", priorityType: "Conceptual", focus: ["intuition"], advice: "Link with Unit 1 topics." },
        { id: "u3-t4", unitId: 3, name: "Topic 4", priority: "medium", avgTime: "30 mins", priorityType: "Conceptual", focus: ["applications"], advice: "Practice with examples." },
      ],
    },
    {
      id: 4,
      name: "Unit 4",
      topics: [
        { id: "u4-t1", unitId: 4, name: "Topic 1", priority: "low", avgTime: "15 mins", priorityType: "Quick Read", focus: ["glossary"], advice: "Skippable if short on time." },
        { id: "u4-t5", unitId: 4, name: "Topic 5", priority: "low", avgTime: "15 mins", priorityType: "Quick Read", focus: ["summary"], advice: "Optional refresh." },
      ],
    },
  ],
};

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
      <div className="topic-bar-head" onClick={onToggle}>
        <div className="topic-bar-title">
          <span className="topic-dot" />
          <span className="topic-name">{topic.name}</span>
        </div>

        <div className="topic-bar-actions" onClick={(e) => e.stopPropagation()}>
          <button className="pill-btn outline" onClick={onOpenQnA}>QnA</button>
          <button className="pill-btn outline" onClick={onOpenNotes}>Notes</button>
          <span className={`expand-icon ${expanded ? "open" : ""}`} aria-hidden>▾</span>
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
  const { syllabus, syllabusLoading, syllabusError, selectedUnit, setSelectedUnit } = useBookDashboard();

  // Generate roadmap data from syllabus
  const roadmapData = useMemo(() => {
    if (syllabus && !syllabusLoading && !syllabusError) {
      return generateRoadmapFromSyllabus(syllabus);
    }
    return data || DEMO; // fallback to provided data or demo
  }, [syllabus, syllabusLoading, syllabusError, data]);

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
          <div className="roadmap-center only-center">
            <div className="roadmap-center-header">
              <p className="rc-title">{currentUnit?.name || "Unit"}</p>
              <p className="rc-sub">Study roadmap by priority</p>
            </div>
            <div className="topics-stack">
              {syllabusLoading ? (
                <div className="loading-state">Loading roadmap data...</div>
              ) : syllabusError ? (
                <div className="error-state">Error loading roadmap data. Please contact support team or raise a query!</div>
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
        </div>
      </div>
    </div>
  );
}