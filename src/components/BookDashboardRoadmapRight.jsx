import React, { useMemo, useState } from "react";
import "./BookDashboardMap.css";
import "./BookDashboardRightSec.css";
import { useBookDashboard } from "../context/book-dashboard-context";
import { generateRoadmapFromSyllabus } from "../utils/roadmapUtils";

const PRIORITY_ORDER = { high: 1, medium: 2, low: 3};
const PRIORITY_META = {
    high: { label: "Highest", className: "roadmap-priority-high"},
    medium: { label: "Medium", className: "roadmap-priority-medium"},
    low: { label: "Lowest", className: "roadmap-priority-low"},
}

export default function BookDashboardRoadmapRight({ data }) {
    const { syllabus, syllabusLoading, syllabusError } = useBookDashboard();
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

    // Generate roadmap data from syllabus
    const roadmapData = useMemo(() => {
        if (syllabus && !syllabusLoading && !syllabusError) {
            return generateRoadmapFromSyllabus(syllabus);
        }
        return data || window.__YES_ROADMAP__ || { units: [] };
    }, [syllabus, syllabusLoading, syllabusError, data]);

    const units = roadmapData?.units || [];

    const summaryList = useMemo(() => {
        const all = units.flatMap((u) => (u.topics || []).map((t) => ({ ...t, unitName: u.name })));
        return all.sort((a, b) => {
            const byPr = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
            if (byPr !== 0) return byPr;
            if (a.unitId !== b.unitId) return (a.unitId || 0) - (b.unitId || 0);
            return (a.name || "").localeCompare(b.name || "");

        });
    }, [units]);

    const jump = (t) => {
        window.dispatchEvent(new CustomEvent("roadmap:jump", {detail: t }));
    };

    const handleTopicSelect = (topicIndex) => {
        setSelectedTopicIndex(topicIndex);
        const topic = summaryList[topicIndex];
        if (topic) {
            jump(topic);
        }
    };

    return (
        <div className="book-dashboard-right-sec">
            {/** Desktop View */}
            <div className="topics-not-dropdown">
                <div className="book-dashboard-topics">
                    <div className="all-topics">All Topics</div>
                    <div className="rs-groups">
                        {["high", "medium", "low"].map((p) => {
                            const list = summaryList.filter((t) => t.priority === p);
                            const meta = PRIORITY_META[p] || PRIORITY_META.low;
                            return (
                                <div key={p} className="rs-group">
                                    <div className={`rs-group-title ${meta.className}`}>
                                        {meta.label} Priority
                                    </div>
                                    <div className="rs-list">
                                        {list.map((t, index) => {
                                            const globalIndex = summaryList.findIndex(item => item.id === t.id);
                                            return (
                                                <button 
                                                    key={t.id} 
                                                    className={`rs-item ${selectedTopicIndex === globalIndex ? "selected-question" : ""}`}
                                                    onClick={() => handleTopicSelect(globalIndex)}
                                                >
                                                    <span className={`rs-dot ${meta.className}`} />
                                                    <span className="rs-text">
                                                        <span className="rs-unit">{t.unitName}:</span> {t.name}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                        {!list.length && <div className="rs-empty">No topics</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/** Mobile View */}
            <div className="mobile-question-dropdown">
                {summaryList.length > 0 && (
                    <select
                        value={selectedTopicIndex}
                        onChange={(e) => {
                            const topicIndex = Number(e.target.value);
                            handleTopicSelect(topicIndex);
                        }}
                    >
                        {summaryList.map((topic, index) => {
                            const meta = PRIORITY_META[topic.priority] || PRIORITY_META.low;
                            const priorityIcon = topic.priority === 'high' ? '🔴' : topic.priority === 'medium' ? '🟡' : '🟢';
                            return (
                                <option key={topic.id} value={index}>
                                    {priorityIcon} {meta.label}: {topic.unitName} - {topic.name}
                                </option>
                            );
                        })}
                    </select>
                )}
            </div>
        </div>
    );
}