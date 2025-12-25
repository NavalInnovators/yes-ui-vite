import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PlanPopUp.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import {
    trackPopupOpen,
    trackPopupClosed,
    schedulePopupAbandonment,
    cancelPopupAbandonment,
    getISTISOString,
} from "../utils/analytics";

function PlanPopUp({ onClose, course, requiredPlan, currentPlan, targetUnit }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const popupId = useMemo(
        () => `plan_popup_${course?.id ?? "unknown"}`,
        [course?.id],
    );
    const openedAtRef = useRef({ date: null, ist: null });
    const dwellStateRef = useRef({
        startedAtDate: null,
        startedAtIST: null,
        closed: false,
        cancelOnCleanup: true,
    });

    const emitPopupClosed = (
        reason,
        outcome = "closed",
        cancelTimer = true,
    ) => {
        if (
            dwellStateRef.current.closed ||
            !dwellStateRef.current.startedAtDate
        ) {
            return;
        }

        const closedAtDate = new Date();
        const closedAtIST = getISTISOString(closedAtDate);
        const durationMs =
            closedAtDate.getTime() -
            dwellStateRef.current.startedAtDate.getTime();

        trackPopupClosed({
            subjectId: course?.id ?? "unknown",
            courseName: course?.name ?? "Unknown Course",
            openedAt: dwellStateRef.current.startedAtIST,
            closedAt: closedAtIST,
            closeReason: reason,
            durationMs,
            outcome,
        });

        dwellStateRef.current.closed = true;
        dwellStateRef.current.cancelOnCleanup = cancelTimer;
    };

    useEffect(() => {
        const openedAtDate = new Date();
        const openedAtIST = getISTISOString(openedAtDate);
        openedAtRef.current = {
            date: openedAtDate,
            ist: openedAtIST,
        };
        dwellStateRef.current = {
            startedAtDate: openedAtDate,
            startedAtIST: openedAtIST,
            closed: false,
            cancelOnCleanup: true,
        };

        trackPopupOpen({
            subjectId: course?.id ?? "unknown",
            courseName: course?.name ?? "Unknown Course",
            requiredPlan: requiredPlan ?? "pro",
            openedAt: openedAtIST,
        });

        return () => {
            if (course?.id && dwellStateRef.current.cancelOnCleanup) {
                cancelPopupAbandonment(course.id);
            }
            if (
                !dwellStateRef.current.closed &&
                dwellStateRef.current.startedAtDate
            ) {
                emitPopupClosed("unmount", "unmount");
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupId, course?.id, course?.name, requiredPlan, targetUnit]);

    const handleSkip = () => {
        cancelPopupAbandonment(course?.id);
        emitPopupClosed("skip", "skipped");
        onClose();
    };

    const handleClose = () => {
        cancelPopupAbandonment(course?.id);
        emitPopupClosed("close_button", "dismissed");
        onClose();
    };

    const handlePlanSelect = (plan) => {
        if (course) {
            const addedAt = getISTISOString();
            addToCart(course, plan, {
                source: "popup",
                metadata: {
                    required_plan: requiredPlan ?? "pro",
                },
            });

            schedulePopupAbandonment({
                subjectId: course.id,
                courseName: course.name,
                addedAt,
            });
        }
        navigate("/mycart");
        emitPopupClosed("plan_selected", "added_to_cart", false);
        onClose();
    };

    return (
        <div
            className="popup-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Choose plan"
        >
            <div className="popup-box">
                <div className="popup-header-and-close">
                    <div className="popup-header">
                        <div>
                            <h2 className="popup-title">
                                Unlock Your Full Potential
                            </h2>
                        </div>
                    </div>
                    <button
                        className="popup-close"
                        onClick={handleClose}
                        aria-label="Close plan popup"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable content area */}
                <div className="popup-content">
                    <div className="subtitle">
                        {" "}
                        <p>Choose the Perfect Plan for Success</p>
                    </div>

                    <div className="plans-wrapper">
                        {/* Basic Plan */}
                        <div
                            className="plan-card basic"
                            role="group"
                            aria-labelledby="basic-title"
                        >
                            <h3 id="basic-title" className="card-plan-title">
                                {" "}
                                <b>Basic Plan </b>
                            </h3>
                            <p className="price">₹110/year</p>

                            <b>Buy 5+ Courses get 25% off</b>
                            <ul>
                                <li>🎓 Everything in Free Plan+</li>
                                <li>🎓 Unlimited Summarizer</li>
                                <li>🎓 Unlimited Rephraser</li>
                                <li>🎓 All 5 Unit Notes</li>
                                <li>🎓 All 5 Unit Insights</li>
                            </ul>
                            <button
                                className="btn-basic"
                                onClick={() => handlePlanSelect("BASIC")}
                            >
                                Proceed with Basic
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div
                            className="plan-card pro"
                            role="group"
                            aria-labelledby="pro-title"
                        >
                            <h3 id="pro-title" className="card-plan-title">
                                <b>Pro Plan</b>{" "}
                                <span className="badge">Best Value!</span>
                            </h3>
                            <p className="price">₹150/year</p>
                            <b>Buy 5+ Courses get 30% off</b>
                            <ul>
                                <li>⚡ Everything in Basic+</li>
                                <li>⚡ AI-powered Chatbot (Notes)</li>
                                <li>⚡ Personalized Roadmap</li>
                            </ul>
                            <div className="alert">
                                🚀 Don’t Miss Out! Upgrade now for exclusive
                                tools!
                            </div>
                            <button
                                className="btn-pro"
                                onClick={() => handlePlanSelect("PRO")}
                            >
                                Go Pro & Maximize Savings!
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer: kept outside scroll area so it's always reachable on mobile */}
                <div className="popup-footer">
                    <p
                        className="free-link"
                        onClick={handleSkip}
                        role="button"
                        tabIndex={0}
                    >
                        Skip for now
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlanPopUp;
