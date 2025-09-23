import React, { useMemo } from "react";
import "./BookDashboardMap.css";
import { classicNameResolver } from "typescript";

const PRIORITY_ORDER = { high: 1, medium: 2, low: 3};
const PRIORITY_META = {
    high: { label: "Highest", className: "roadmap-priority-high"},
    medium: { label: "Medium", className: "roadmap-priority-medium"},
    low: { label: "Lowest", className: "roadmap-priority-low"},
}

export default function BookDashboardRoadmapRight({ data }) {
    const units = data?.units || window.__YES_ROADMAP__?.units || [];

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

    return (
        <div className="book-dashboard-roadmap-right-sec roadmap-summary right-column">
            <div className="rs-header">Summarised Roadmap</div>

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
                                {list.map((t) => (
                                    <button key={t.id} className="rs-item" onClick={() => jump(t)}>
                                        <span className={`rs-dot ${meta.className}`} />
                                        <span className="rs-text">
                                            <span className="rs-unit">{t.unitName}:</span> {t.name}
                                        </span>
                                    </button>
                                ))}
                                {!list.length && <div className="rs-empty">No topics</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}